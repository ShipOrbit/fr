import { Package } from "lucide-react";
import Layout from "../../components/layout";

export default function NotYetPage() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white flex flex-col items-center justify-center gap-4 p-4 w-1/2 h-96 rounded-2xl shadow-2xl">
          <Package size={48} className="animate-pulse" />
          <h1 className="text-2xl font-bold animate-pulse">Working On It..</h1>
        </div>
      </div>
    </Layout>
  );
}
