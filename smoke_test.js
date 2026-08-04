'use strict';

process.env.JWT_SECRET = 'unused';
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const sequelize = new Sequelize('sqlite::memory:', { logging: false });
const modelsDir = path.join(__dirname, 'src', 'models');
const db = {};

fs.readdirSync(modelsDir)
  .filter((f) => f.endsWith('.js') && f !== 'index.js')
  .forEach((f) => {
    const model = require(path.join(modelsDir, f))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((name) => {
  if (db[name].associate) db[name].associate(db);
});

let pass = 0;
let fail = 0;
function check(label, condition) {
  if (condition) {
    console.log(`  PASS: ${label}`);
    pass++;
  } else {
    console.log(`  FAIL: ${label}`);
    fail++;
  }
}

async function run() {
  await sequelize.sync({ force: true });
  console.log('--- Schema sync ---');
  check('All 10 models loaded', Object.keys(db).length === 10);

  console.log('\n--- Seed core hierarchy ---');
  const sector = await db.Sector.create({ sector_name: 'Finance' });
  const institution = await db.Institution.create({
    institution_acronym: 'MFDP',
    institution_name: 'Ministry of Finance and Development Planning',
    institution_type: 'Ministry',
    sector_id: sector.sector_id,
  });
  const funding = await db.FundingSource.create({
    funding_source_name: 'World Bank (IDA)',
  });
  const program = await db.DonorProgram.create({
    program_code: 'GREAT',
    program_name: 'Governance Reform and Accountability Transformation Project',
    budget_allocated: 30000000,
    is_regional: false,
    funding_id: funding.funding_id,
  });
  const component = await db.Component.create({
    component_code: 'C1',
    component_name: 'Digital Public Services',
    allocated_budget: 9200000,
    program_id: program.program_id,
  });
  const category = await db.Category.create({ category_name: 'Financial Systems' });

  check('Sector created', !!sector.sector_id);
  check('Institution linked to sector', institution.sector_id === sector.sector_id);
  check('Donor program linked to funding source', program.funding_id === funding.funding_id);
  check('Component linked to program', component.program_id === program.program_id);

  console.log('\n--- Cascading dropdown queries (no auth) ---');
  const programsForFunding = await db.DonorProgram.findAll({
    where: { funding_id: funding.funding_id },
  });
  check('Programs filterable by funding_id', programsForFunding.length === 1);

  const componentsForProgram = await db.Component.findAll({
    where: { program_id: program.program_id },
  });
  check('Components filterable by program_id', componentsForProgram.length === 1);

  console.log('\n--- Project creation (open, no auth) ---');
  const project = await db.ITProject.create({
    project_name: 'IFMIS',
    project_code: 'IFMIS-01',
    status: 'active',
    percent_done: 55,
    total_budget: 9200000,
    spent: 4100000,
    institution_id: institution.institution_id,
    component_id: component.component_id,
    category_id: category.category_id,
  });
  check('Project created without auth', !!project.project_id);

  const milestone = await db.Milestone.create({
    milestone_title: 'Phase 1 deployment',
    target_date: '2025-09-30',
    is_completed: true,
    project_id: project.project_id,
  });
  check('Milestone linked to project', milestone.project_id === project.project_id);

  console.log('\n--- Project update (no auth, no institution scoping) ---');
  await project.update({ percent_done: 70, spent: 5000000 });
  const updated = await db.ITProject.findByPk(project.project_id);
  check('Project updates without auth', updated.percent_done === 70);

  console.log('\n--- Nested fetch (full hierarchy) ---');
  const fullProject = await db.ITProject.findByPk(project.project_id, {
    include: [
      { model: db.Institution, as: 'institution' },
      {
        model: db.Component,
        as: 'component',
        include: [
          {
            model: db.DonorProgram,
            as: 'donorProgram',
            include: [{ model: db.FundingSource, as: 'fundingSource' }],
          },
        ],
      },
      { model: db.Milestone, as: 'milestones' },
    ],
  });
  check('Nested include: institution', fullProject.institution.institution_acronym === 'MFDP');
  check('Nested include: component -> program -> funding', fullProject.component.donorProgram.fundingSource.funding_source_name === 'World Bank (IDA)');
  check('Nested include: milestones', fullProject.milestones.length === 1);

  console.log('\n--- Budget over-allocation check (controller-level logic simulated) ---');
  const existingComponents = await db.Component.findAll({ where: { program_id: program.program_id } });
  const totalAllocated = existingComponents.reduce((sum, c) => sum + Number(c.allocated_budget), 0);
  const wouldExceed = totalAllocated + 25000000 > Number(program.budget_allocated);
  check('Over-allocation correctly detected', wouldExceed === true);

  console.log(`\n=== ${pass} passed, ${fail} failed ===`);
  if (fail > 0) process.exit(1);
}

run().catch((e) => {
  console.error('CRASH:', e);
  process.exit(1);
});
