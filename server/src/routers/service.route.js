import express from 'express';
import serviceController from '../controllers/service.controller.js';



const router = express.Router({ mergeParams: true });


router.get("/", serviceController.getServicePackages);

router.post("/", serviceController.createServicePackage);

router.put(":/serviceId", serviceController.updateServicePackageById);

router.delete(":/serviceId", serviceController.deleteServicePackageById);


export default router;