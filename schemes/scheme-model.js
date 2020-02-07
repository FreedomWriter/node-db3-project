const db = require("../data/db-config");

function find() {
  return db("schemes").select();
}

function findById(id) {
  return db("schemes")
    .where("id", id)
    .first();
}

function findSteps(id) {
  return db("steps as s")
    .join("schemes as sc", "s.scheme_id", "sc.id")
    .where("s.scheme_id", id)
    .select("sc.scheme_name", "s.id", "s.step_number", "s.instructions")
    .orderBy("s.step_number", "asc");
}

async function add(scheme) {
  const [id] = await db("schemes").insert(scheme);
  return db("schemes")
    .where("id", id)
    .first();
}

async function update(changes, id) {
  await db("schemes")
    .where({ id })
    .update(changes);

  return findById(id);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

async function addStep(step, scheme_id) {
  const [id] = await db("steps")
    .where("scheme_id", scheme_id)
    .insert(step);
  return findSteps(scheme_id);
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
};
