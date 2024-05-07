import responseHandler from "../handlers/response.handler.js";
import servicePackagesModel from "../models/servicePackage.model.js";

const createServicePackage = async (req, res) => {
     try {
          const { name, description, price, numberOfPeople, icon } = req.body;

          const servicePackage = new servicePackagesModel({
               name: name,
               description: description,
               price: price,
               numberOfPeople: numberOfPeople, 
               icon: icon
          });

          const result = await servicePackage.save();
          responseHandler.created(res, result);
     } catch (err) {
          return responseHandler.error(res, `Failed to create service package: ${err}`);
     }
}

const getServicePackages = async (req, res) => {
     try {
          const servicePackages = await servicePackagesModel.find({});
          if (!servicePackages || servicePackages.length == 0) return responseHandler.notfound(res, 'Service list is empty !')
          return responseHandler.ok(res, servicePackages);
     } catch (err) {
          return responseHandler.error(res, { message: `Failed to retrieve service packages: ${err}` });
     }
}

const getServicePackageById = async (req, res) => {
     try {
          const servicePackage = await servicePackagesModel.findById(req.params.id);
          return responseHandler.ok(res, servicePackage);
     } catch (err) {
          return responseHandler.error(res, { message: `Failed to retrieve service package: ${err}` });
     }
}

const updateServicePackageById = async (req, res) => {
     try {
          const { id } = req.params;
          const { newName, newDescription, newPrice, newNumberOfPeople } = req.body;
          const servicePackage = await servicePackagesModel.findById(id);
          if (!servicePackage) {
               return responseHandler.error(res, 'Service package not found!');
          }

          servicePackage.name = newName;
          servicePackage.description = newDescription;
          servicePackage.price = newPrice;
          servicePackage.numberOfPeople = newNumberOfPeople;

          const result = await servicePackage.save();

          return responseHandler.ok(res, { message: 'Service package updated!', ...result });
     } catch (err) {
          return responseHandler.error(res, `Failed to update service package: ${err}`)
     }
}

const deleteServicePackageById = async (req, res) => {
     try {
          const { id } = req.params;
          const result = await servicePackagesModel.deleteOne({ _id: id });

          return responseHandler.ok(res, { message: 'Service package deleted !', ...result });
     } catch (err) {
          return responseHandler.error(res, { message: `Failed to delete service package: ${err}` })
     }
}

export default {
     createServicePackage,
     updateServicePackageById,
     getServicePackageById,
     deleteServicePackageById,
     getServicePackages
};




