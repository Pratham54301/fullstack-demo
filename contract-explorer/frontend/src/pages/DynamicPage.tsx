import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/Loader";
import { api } from "../api";

type Page = {
  _id: string;
  title: string;
  url: string;
  filters: Record<string, any>;
};

type Contract = {
  _id: string;
  name: string;
  contractType: string;
  amount: number;
  description: string;
  status: string;
};

export const DynamicPage = () => {
  const { url } = useParams<{ url: string }>();

  
  const {
    data: page,
    isLoading: loadingPage,
    refetch: refetchPage,
    isFetching: fetchingPage,
  } = useQuery<Page | null>({
    queryKey: ["page", url],
    enabled: !!url,
    queryFn: async () => {
      const res = await api.get("/api/pages", { params: { url } });
      return res.data[0] ?? null;
    },
  });

  
  const {
    data: contracts,
    isLoading: loadingContracts,
    refetch: refetchContracts,
    isFetching: fetchingContracts,
  } = useQuery<Contract[]>({
    queryKey: ["contracts", page?._id],
    enabled: !!page?._id,
    queryFn: async () => {
      const res = await api.get("/api/contracts", {
        params: { pageId: page?._id },
      });
      return res.data;
    },
  });

  
  const handleRefresh = async () => {
    await Promise.all([refetchPage(), refetchContracts()]);
  };

  if (loadingPage) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Loader />
      </div>
    );
  }

  if (!page) {
    return <div className="p-6 text-red-600">Page not found.</div>;
  }

  const isRefreshing = fetchingPage || fetchingContracts;

  return (
    <div className="p-6">
      
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{page.title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Filters from DB: {JSON.stringify(page.filters)}
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`px-4 py-2 text-sm rounded flex items-center gap-2 transition
            ${
              isRefreshing
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
        >
          {isRefreshing ? (
            <>
              <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Refreshing...
            </>
          ) : (
            <>🔄 Refresh</>
          )}
        </button>
      </div>

      {loadingContracts ? (
        <div className="mt-4">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Contract Type</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {contracts?.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.contractType}</td>
                  <td className="px-4 py-2">₹{c.amount}</td>
                  <td className="px-4 py-2">{c.status}</td>
                  <td className="px-4 py-2 text-slate-600">
                    {c.description ?? "-"}
                  </td>
                </tr>
              ))}

              {contracts && contracts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No contracts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
