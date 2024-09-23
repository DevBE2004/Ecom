import path from "../utils/path";
import icons from "../utils/icons";
const {
  RxDashboard,
  FaProductHunt,
  HiUserGroup,
  RiBillFill,
  BsShieldShaded,
  FaTruck,
  BsGift,
  FaReply,
  FaTty,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  FaHistory,
} = icons;

export const navigation = [
  {
    id: 1,
    value: `HOME`,
    path: `/${path.HOME}`,
  },
  {
    id: 5,
    value: `PRODUCTS`,
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 2,
    value: `BLOGS`,
    path: `/${path.BLOGS}`,
  },
  {
    id: 3,
    value: `OUR SERVICES`,
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 4,
    value: `FAQS`,
    path: `/${path.FAQS}`,
  },
];
export const productExtraInfomation = [
  {
    id: 1,
    title: "Guarantee",
    sub: "Quality Checked",
    icon: <BsShieldShaded />,
  },
  {
    id: 2,
    title: "Free Shipping",
    sub: "Free On All Products",
    icon: <FaTruck />,
  },
  {
    id: 3,
    title: "Special Gift Cards",
    sub: "Special Gift Cards",
    icon: <BsGift />,
  },
  {
    id: 4,
    title: "Free Return",
    sub: "Within 7 Days",
    icon: <FaReply />,
  },
  {
    id: 5,
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icon: <FaTty />,
  },
];

export const description = [
  {
    id: 1,
    title: "DESCRIPTION",
    content: `Technology: GSM / HSPA / LTE
    Dimensions: 153.8 x 75.5 x 7.6 mm
    Weight: 154 g
    Display: IPS LCD 5.5 inches
    Resolution: 720 x 1280
    OS: Android OS, v6.0 (Marshmallow)
    Chipset: Octa-core
    CPU: Octa-core
    Internal: 32 GB, 4 GB RAM
    Camera: 13MB - 20 MP`,
  },
  {
    id: 2,
    title: "WARRANTY",
    content: `WARRANTY INFORMATION
    LIMITED WARRANTIES
    Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
    
    Frames Used In Upholstered and Leather Products
    Limited Lifetime Warranty
    A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
  },
  {
    id: 3,
    title: "DELIVERY",
    content: `PURCHASING & DELIVERY
    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  },
  {
    id: 4,
    title: "PAYMENT",
    content: `PURCHASING & DELIVERY
    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  },
];

export const colors = ["gray", "Silver", "black", "white", "42MM"];

export const sortBy = [
  { id: 1, value: "-sold", text: "best selling" },
  { id: 2, value: "title", text: "A-Z" },
  { id: 3, value: "-title", text: "Z-A" },
  { id: 4, value: "price", text: "Price, low to hight" },
  { id: 5, value: "-price", text: "Price, hight to low" },
  { id: 6, value: "createdAt", text: "date, old to new" },
  { id: 7, value: "-createdAt", text: "date, new to old" },
];

export const voteStar = [
  { id: 1, text: "rất tệ" },
  { id: 2, text: "tệ" },
  { id: 3, text: "tạm được" },
  { id: 4, text: "tốt" },
  { id: 5, text: "rất tốt" },
];

export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "DashBoard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <RxDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Manage User",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <HiUserGroup />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Manage Product",
    subMenu: [
      { text: "Manage Product", path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}` },
      { text: "Create Product", path: `/${path.ADMIN}/${path.CREATE_PRODUCT}` },
    ],
    icon: <FaProductHunt />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Manage Order",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillFill />,
  },
];
export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Persional",
    path: `/${path.MEMBER}/${path.PERSIONAL}`,
    icon: <RxDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "My Cart",
    path: `/${path.MEMBER}/${path.MYCART}`,
    icon: <AiOutlineShoppingCart />,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Wish List",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <AiOutlineHeart />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "History",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <FaHistory />,
  },
];

export const roles = [
  {
    code: 1,
    value: "Admin",
  },
  {
    code: 0,
    value: "User",
  },
];
export const block = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];

export const statusOptions = [
  {
    label: "Cancelled",
    value: "Cancelled",
  },
  {
    label: "Successed",
    value: "Successed",
  },
];

export const Blogs = [
  {
    id: 1,
    title: "Introduction to Electronics: The Basics",
    byUser: "Jane Doe",
    createAt: "2024-01-01",
    content:
      "A comprehensive guide to the basics of electronics, covering fundamental concepts and components.",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/articles/blog4_1024x1024.jpg?v=1492594943",
    link: "https://www.electronics-tutorials.ws/electronics/electronics.html",
  },
  {
    id: 2,
    title: "Top 10 Electronics Projects for Beginners",
    byUser: "John Smith",
    createAt: "2024-01-05",
    content:
      "Explore ten exciting electronics projects that are perfect for beginners to get started.",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/articles/blog3_1024x1024.jpg?v=1492594940",
    link: "https://www.electronicwings.com/arduino/top-10-arduino-projects-for-beginners",
  },
  {
    id: 3,
    title: "Understanding Circuit Diagrams",
    byUser: "Alice Johnson",
    createAt: "2024-01-10",
    content:
      "Learn how to read and understand circuit diagrams, a crucial skill in electronics.",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/articles/blog3_1024x1024.jpg?v=1492594940",
    link: "https://www.electronics-tutorials.ws/blog/understanding-circuit-diagrams/",
  },
];

export const FAQS = [
  {
    id: 1,
    Q: "1. What payment you accept?",
    A: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    Q: "2. In what country can you deliver?",
    A: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    Q: "3. what payments you accept?",
    A: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    Q: "4. how to track my parcel?",
    A: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    Q: "5. how to handle my parcel?",
    A: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 6,
    Q: "6. Why amadea is the best e-commerce theme?",
    A: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];
