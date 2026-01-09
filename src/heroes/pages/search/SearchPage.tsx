import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSearchParams } from "react-router";
import { useSearchHeroes } from "@/heroes/hooks/useSearchHeroes";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const queryStrength = searchParams.get("strength") ?? "0";
  const { data: heroesSearch } = useSearchHeroes(name, queryStrength);

  if (!heroesSearch) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de Superheroes"
        description="Descubre, explora y administra supero héroes y villanos"
      />
      {/* BreadCrumb */}
      <CustomBreadCrumbs
        currentPage="Buscador de héroes"
        // breadcrumbs={[
        //   {
        //     label: "Home",
        //     to: "/",
        //   },
        //   {
        //     label: "Home",
        //     to: "/",
        //   },
        //   {
        //     label: "Home",
        //     to: "/",
        //   },
        // ]}
      />
      {/* Stats Dashboard */}
      <HeroStats />

      {/* Controls Filter and Search */}
      <SearchControls />
      {/*Grid Search Heroes */}
      <HeroGrid heroes={heroesSearch} />
    </>
  );
};

export default SearchPage;
