
import { Toaster } from "@/components/ui/toaster";
import "@/app/globals.css";
import UserProvider from "@/context/user-context";
import { decrypt, verifySession } from "@/services/statelessSession";
import ProductsProvider from "@/context/products-context";
import { getCollections } from "@/services/operations";
import { IProduct, IService } from "@/types";
import ServicesProvider from "@/context/services-context";


export default async function GlobalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await verifySession()).cookie;
  const session = await decrypt(cookie);
  const products = await fetchProducts();
  const services = await fetchServices();

  return (
    <UserProvider session={
            session ? session : { uid: "", expiresAt: new Date(), token: "" }
          }>
      <ProductsProvider initialProducts={products || [] as IProduct[]}>
        <ServicesProvider initialServices={services || [] as IService[]}>
          {children}
          <Toaster />
        </ServicesProvider>
      </ProductsProvider>
    </UserProvider>
  );
}

// Trae los productos de firebase del lado del servidor
async function fetchProducts(): Promise<IProduct[]> {
  try {
    const productsList = await getCollections("products");
    return productsList as IProduct[];
  } catch (error) {
    console.error("Error initializing products:", error);
    return [];
  }
};

async function fetchServices(): Promise<IService[]> {
  try {
    const servicesList = await getCollections("services");
    return servicesList as IService[];
  } catch (error) {
    console.error("Error initializing services:", error);
    return [];
  }
};