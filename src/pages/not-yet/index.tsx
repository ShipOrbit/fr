import { Package } from "lucide-react";
import Layout from "../../components/layout";

export default function NotYetPage() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <Package size={48} className="animate-pulse" />
        <h1 className="text-2xl font-bold animate-pulse">Working On It..</h1>
      </div>
    </Layout>
  );
}
