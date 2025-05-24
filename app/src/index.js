import sequelize from './database.js';
import CategoryController from './controllers/CategoryController.js';
import inquirer from 'inquirer';
import ProductController from './controllers/ProductController.js';


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à PostgreSQL réussie !');
  } catch (error) {
    console.error('Échec de la connexion à PostgreSQL :', error);
  }
})();

await sequelize.sync({}) // Synchronize the database

async function menu() {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Que voulez-vous faire ?',
    choices: [
      'Rechercher un produit',
      'Ajouter un produit',
      'Retourner un produit',
      'Consulter les produits',
      'Quitter'
    ]
  });

  switch (action) {
    case 'Rechercher un produit':
      const { searchField } = await inquirer.prompt({
        type: 'list',
        name: 'searchField',
        message: 'Souhaitez-vous rechercher un produit par son nom ou son id ?',
        choices: ['Nom', 'Id', 'Catégorie']
      });
      switch (searchField) {
        case 'Nom':
          const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Nom du produit :'
          });
          try {
            await ProductController.searchProductByName(name);
          } catch (error) {
            console.error('Erreur lors de la recherche du produit :', error);
          }
          break;
        case 'Id':
          const { id } = await inquirer.prompt({
            type: 'input',
            name: 'id',
            message: 'Id du produit :'
          });
          try {
            await ProductController.searchProductById(id);
          } catch (error) {
            console.error('Erreur lors de la recherche du produit :', error);
          }
          break;
        case 'Catégorie':
          const { category } = await inquirer.prompt({
            type: 'input',
            name: 'category',
            message: 'Nom de la catégorie :'
          });
          try {
            await ProductController.searchProductByCategory(category);
          } catch (error) {
            console.error('Erreur lors de la recherche du produit :', error);
          }
          break;
      }
      break;
    case 'Ajouter un produit':
      const { name, price, stockQuantity, categoryName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Nom du produit :'
        },
        {
          type: 'input',
          name: 'price',
          message: 'Prix du produit :'
        },
        {
          type: 'input',
          name: 'stockQuantity',
          message: 'Quantité en stock :'
        },
        {
          type: 'input',
          name: 'categoryName',
          message: 'Nom de la catégorie :'
        }
      ]);

      try {
        await
          ProductController.createProduct(name, price, stockQuantity, categoryName);;
      } catch (error) {
        console.error('Erreur lors de l\'ajout du produit :', error);
      }
      break;
    case 'Retourner un produit':
      const { productId, quantity } = await inquirer.prompt([
        {
          type: 'input',
          name: 'productId',
          message: 'Identifiant du produit :'
        },
        {
          type: 'input',
          name: 'quantity',
          message: 'Quantité à retourner :'
        }
      ]);
      try {
        await ProductController.returnProduct(productId, quantity);
      }
      catch (error) {
        console.error('Erreur lors du retour du produit :', error);
      }
      break;
    case 'Consulter les produits':
      try {
        await ProductController.getAllProducts();
      } catch (error) {
        console.error('Erreur lors de la recherche des produits :', error);
      }
      break;
    case 'Quitter':
      console.log('Au revoir !');
      process.exit(0);
  }

  await menu();
}

menu();
