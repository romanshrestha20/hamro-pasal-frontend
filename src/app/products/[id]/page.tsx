export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Product {params.id}</h1>
      <p>Product details coming soon...</p>
    </div>
  );
}
