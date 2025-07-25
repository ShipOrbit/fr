import { Calendar, DollarSign, FileText, Loader2 } from "lucide-react";
import InvoicesTable from "../../components/invoices-table";
import { useFetch } from "../../hooks/use-fetch";
import { paymentApi } from "../../services/api/payment";
import formatCurrency from "../../utils/format-currency";
import Layout from "../components/layout";
import { useMemo } from "react";

const BillingPage = () => {
  const { data: invoicesData, loading: invoicesLoading } = useFetch(
    paymentApi.getInvoices
  );

  const { totalPayments, overdueAmount, thisMonthPayments } = useMemo(() => {
    let totalPayments = 0;
    let overdueAmount = 0;
    let thisMonthPayments = 0;

    if (!invoicesData) {
      return { totalPayments, overdueAmount, thisMonthPayments };
    }

    const now = new Date();
    const currentMonth = now.getMonth(); // 0-based
    const currentYear = now.getFullYear();

    for (const invoice of invoicesData.results) {
      const amount = parseFloat(invoice.total_amount || "0");

      if (invoice.status === "paid") {
        totalPayments += amount;

        // ✅ Check if paid_at is in current month and year
        if (invoice.paid_at) {
          const paidDate = new Date(invoice.paid_at);
          const paidMonth = paidDate.getMonth();
          const paidYear = paidDate.getFullYear();

          if (paidMonth === currentMonth && paidYear === currentYear) {
            thisMonthPayments += amount;
          }
        }
      }

      if (invoice.status === "overdue") {
        overdueAmount += amount;
      }
    }

    return { totalPayments, overdueAmount, thisMonthPayments };
  }, [invoicesData]);

  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-gray-500">Billing & </span>
            Payments
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your invoices, payment methods, and billing settings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        <div>
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Payments
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalPayments)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(overdueAmount)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    This Month
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(thisMonthPayments)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Invoices */}
          {invoicesLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Invoices
                </h3>
              </div>
              <div className="overflow-x-auto">
                {invoicesData && (
                  <InvoicesTable invoices={invoicesData.results} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BillingPage;
