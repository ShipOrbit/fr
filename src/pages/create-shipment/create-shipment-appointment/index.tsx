import React from "react";
import { Navigate, useParams } from "react-router";
import CreateShipmentAppointment from "../../../components/create-shipment-apointment";
import Loader from "../../../components/loader";
import { useFetch } from "../../../hooks/use-fetch";
import { shipperApi } from "../../../services/api/shipper";
import Layout from "../../../components/layout/app-layout";

const CreateShipmentAppointmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: shipment,
    setData: setShipment,
    loading,
  } = useFetch(() => shipperApi.getShipmentById({ id: id! }));

  if (!shipment && !loading) {
    return <Navigate to="/404" />;
  }

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <CreateShipmentAppointment
          shipment={shipment!}
          setShipment={setShipment}
        />
      )}
    </Layout>
  );
};

export default CreateShipmentAppointmentPage;
