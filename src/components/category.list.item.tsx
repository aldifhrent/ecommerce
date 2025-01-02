import { NavigationMenuLink } from "./ui/navigation-menu";

interface CategoryListItemProps {
  type: string;
}

const CategoryListItem = ({ type }: CategoryListItemProps) => {
  return (
    <li className="hover:bg-gray-100 rounded-md transition-all">
      <NavigationMenuLink
        asChild
        className="block w-full hover:cursor-pointer"
        href="#"
      >
        <p className="p-4 text-sm font-medium leading-none text-gray-800 hover:text-blue-600">
          {type}
        </p>
      </NavigationMenuLink>
    </li>
  );
};

export default CategoryListItem;
