import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";

const CustomerCollectionRef = collection(db, "Customers");
class CustomerDataService {
  addCustomer = (newCustomer) => {
    return addDoc(CustomerCollectionRef, newCustomer);
  };

  updateCustomer = (id, updateCustomer) => {
    const custDoc = doc(db, "Customers", id);
    return updateDoc(custDoc, updateCustomer);
  };

  deleteCustomer = (id) => {
    const custDoc = doc(db, "Customers", id);
    return deleteDoc(custDoc);
  };

  getAllCustomers = () => {
    return getDocs(CustomerCollectionRef);
  };

  getCustomer = (id) => {
    const custDoc = doc(db, "Customers", id);
    return getDoc(custDoc);
  };
}

export default new CustomerDataService();
