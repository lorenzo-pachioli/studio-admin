# **App Name**: Seller Central

## Core Features:

- Authentication: Enable sellers to log in and register securely to access their product and service management tools.
- Product/Service Overview: Display all products and services associated with the logged-in seller, with key details such as name, price, and stock, and also displaying their image.
- Add Product/Service: Allow sellers to add new products or services, with fields matching the Product and Service interfaces provided (uid, name, description, price, category, imageUrl, rating, stock, brand, tags, dataAiHint for products; uid, name, description, category, imageUrl, location, contact, rating, dataAiHint for services).
- Edit Product/Service: Enable sellers to modify existing product and service details, updating the information stored in the Firestore database. Also here the 'dataAiHint' property of the products or services could be changed to help the IA models when are making their prompts.
- Remove Product/Service: Provide a function for sellers to remove products or services from their listings.
- AI hint tool: Provide suggestions of what to fill the 'dataAiHint' with using a tool.
- Data Sync: When products or services are added, modified or removed they should be changed directly in the original 'PawsomeMart' app.

## Style Guidelines:

- Primary color: Mimic the bright yellow (#FFDA63) from PawsomeMart for consistency and a friendly feel.
- Background color: Light beige (#FAF9F6), almost white, for a clean and spacious look, promoting focus on the products.
- Accent color: Soft orange (#FFB347), similar to PawsomeMart's CTAs, to draw attention to key actions.
- Body and headline font: 'PT Sans' (sans-serif), retaining PawsomeMart's friendly, readable font style.
- Clean and organized layout, similar to the e-commerce store, with a focus on easy navigation and product discoverability.
- Simple, consistent icons, potentially using the same pet-related icons from PawsomeMart, for visual harmony.
- Subtle animations for loading states and user interactions to provide feedback without being distracting.