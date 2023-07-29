const Joi = require("joi");
const { Pet } = require("../models"); // Assuming you have a Pet model defined

class PetController {
  // GET /
  async getAll(req, res) {
    try {
      const pets = await Pet.findAll();

      return res.json(pets);
    } catch (error) {
      return res.status(500).json({ error: "Failed to get pets" });
    }
  }

  // POST /{petId}/uploadImage
  async uploadImage(req, res) {
    try {
      const petId = parseInt(req.params.petId);

      // Logic to handle image upload and association with the pet
      // You might want to use a library like multer to handle file uploads.

      return res.json({ message: "Image uploaded successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to upload image" });
    }
  }

  // POST /
  async create(req, res) {
    const schema = Joi.object({
      name: Joi.string().required(),
      status: Joi.string().valid("available", "pending", "sold").required(),
    });
    try {
      const { name, status } = await schema.validateAsync({
        name: req.body.name,
        status: req.body.status,
      });

      const newPet = await Pet.create({ name, status });

      return res.status(201).json(newPet);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Failed to create a pet: ${error.message}` });
    }
  }

  // PUT /
  async update(req, res) {
    try {
      const { petId, name, age, breed } = req.body;

      const updatedPet = await Pet.update(
        { name, age, breed },
        { where: { id: petId } }
      );

      if (updatedPet[0] === 0) {
        return res.status(404).json({ error: "Pet not found" });
      }

      return res.json({ message: "Pet updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update a pet" });
    }
  }

  // GET /findByStatus
  async findByStatus(req, res) {
    try {
      const { status } = req.query;

      // Logic to find pets by status
      const pets = await Pet.findAll({ where: { status } });

      return res.json(pets);
    } catch (error) {
      return res.status(500).json({ error: "Failed to find pets by status" });
    }
  }

  // GET /{petId}
  async getById(req, res) {
    try {
      const petId = parseInt(req.params.petId);

      const pet = await Pet.findByPk(petId);

      if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
      }

      return res.json(pet);
    } catch (error) {
      return res.status(500).json({ error: "Failed to get a pet" });
    }
  }

  // POST /{petId}
  async updateById(req, res) {
    try {
      const petId = parseInt(req.params.petId);
      const { name, age, breed } = req.body;

      const [updatedRowCount] = await Pet.update(
        { name, age, breed },
        { where: { id: petId } }
      );

      if (updatedRowCount === 0) {
        return res.status(404).json({ error: "Pet not found" });
      }

      return res.json({ message: "Pet updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update a pet" });
    }
  }

  // DELETE /{petId}
  async delete(req, res) {
    try {
      const petId = parseInt(req.params.petId);

      const deletedRowCount = await Pet.destroy({ where: { id: petId } });

      if (deletedRowCount === 0) {
        return res.status(404).json({ error: "Pet not found" });
      }

      return res.json({ message: "Pet deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete a pet" });
    }
  }

  // Add more methods as per your requirement
}

module.exports = new PetController();
