import CitasController  from "../controllers/citas.controller.js";
import CitasService from "../services/citas.service.js";
import CitasRepository from "../repositories/citas.repository.js";
import CustomContainer from "./custom-container.js";

const container = CustomContainer.getInstance();

container.addClass(CitasRepository.name, CitasRepository, []);
container.addClass(CitasService.name, CitasService, [CitasRepository.name]);
container.addClass(CitasController.name, CitasController, [CitasService.name]);