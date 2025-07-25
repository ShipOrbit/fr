import React from "react";
import { Navigate, useParams } from "react-router";
import ShipmentFinalizeForm from "../../../components/finalize-shipment-form";
import { useFetch } from "../../../hooks/use-fetch";
import { shipperApi } from "../../../services/api/shipper";
import Layout from "../../components/layout";
import Loader from "../../../components/loader";

const ShipmentFinalizing: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: shipment, loading } = useFetch(() =>
    shipperApi.getShipmentById({ id: id! })
  );

  if (!shipment && !loading) {
    return <Navigate to="/404" />;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? <Loader /> : <ShipmentFinalizeForm shipment={shipment!} />}
      </div>
    </Layout>
  );
};

export default ShipmentFinalizing;
