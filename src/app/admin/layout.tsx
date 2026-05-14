import '../globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-5">
        <h1 className="text-xl font-bold">ROKKO Admin</h1>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}