import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import getMarcas from "@/actions/get-marcas";
import getColors from "@/actions/get-colors";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-cart";

import Filter from "./components/filters";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

interface CateporyPageProps{
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sizeId: string;
  }
}

const CategoryPage: React.FC<CateporyPageProps> = async ({
  params,
  searchParams
}) => {

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const marcas = await getMarcas();
  const colors = await getColors(); 
  const category = await getCategory(params.categoryId);

  return ( 
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard}/>
      </Container>
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters sizes={marcas} colors={colors}/>
          <div className="hidden lg:block">
            <Filter   
              valueKey = "sizeId"
              name = "Marcas"
              data={marcas}
            />
            <Filter   
              valueKey = "colorId"
              name = "Colores"
              data={colors}
            />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt:0">
            { products.length === 0 && <NoResults /> }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {
                products.map((item) => (
                  <ProductCard 
                    key={item.id}
                    data={item}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default CategoryPage;