import ProductController from "../src/controllers/ProductController";
import Product from "../src/models/Product";
import sequelize from "../src/database";
import { expect, jest } from "@jest/globals";
import Category from "../src/models/Category";

describe("ProductController", () => {
    let consoleSpy;

    beforeEach(() => {
        jest.clearAllMocks();
        consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("searchProductByName should return a product successfully", async () => {
        const mockProduct = {
            id: 1,
            name: "Laptop",
            price: 1000,
            stockQuantity: 10,
            category: { name: "Electronics" },
        };
        const mockFindOne = jest.fn().mockResolvedValue(mockProduct);
        Product.findOne = mockFindOne;

        await ProductController.searchProductByName("Laptop");

        expect(mockFindOne).toHaveBeenCalledWith({
            where: { name: "Laptop" },
        });
        expect(consoleSpy).toHaveBeenCalledWith("Produit trouvé : ID: 1, Nom: Laptop, Prix: 1000, Quantité: 10, Catégorie: Electronics");
    });

    it("searchProductById should return a product successfully", async () => {
        const mockProduct = {
            id: 2,
            name: "Ps5",
            price: 599,
            stockQuantity: 5,
            category: { name: "Electronics" },
        };
        const mockFindOne = jest.fn().mockResolvedValue(mockProduct);
        Product.findOne = mockFindOne;

        await ProductController.searchProductById(1);

        expect(mockFindOne).toHaveBeenCalledWith({
            where: { id: 1 },
        });
        expect(consoleSpy).toHaveBeenCalledWith("Produit trouvé : ID: 2, Nom: Ps5, Prix: 599, Quantité: 5, Catégorie: Electronics");
    });

    it("searchProductByCategory should return a product successfully", async () => {
        const mockCategory = {
            id: 1,
            name: "Electronics",
        };
        const mockFindOneCategory = jest.fn().mockResolvedValue(mockCategory);
        Category.findOne = mockFindOneCategory;
        const mockFindOne = jest.fn().mockResolvedValue([{
            id: 3,
            name: "Iphone",
            price: 999,
            stockQuantity: 20,
            category: { name: "Electronics" },
        }, {
            id: 4,
            name: "Samsung",
            price: 799,
            stockQuantity: 15,
            category: { name: "Electronics" },
        }]);
        Product.findAll = mockFindOne;
        await ProductController.searchProductByCategory("Electronics");
        expect(mockFindOneCategory).toHaveBeenCalledWith({
            where: { name: "Electronics" },
        });
        expect(mockFindOne).toHaveBeenCalledWith({
            where: { categoryId: 1 },
        });
        expect(consoleSpy).toHaveBeenCalledWith("Produit trouvé : ID: 3, Nom: Iphone, Prix: 999, Quantité: 20, Catégorie: Electronics");
        expect(consoleSpy).toHaveBeenCalledWith("Produit trouvé : ID: 4, Nom: Samsung, Prix: 799, Quantité: 15, Catégorie: Electronics");
    });

    it("createProduct should create a product successfully", async () => {
        const mockCategory = {
            id: 1,
            name: "Electronics",
        };
        const mockFindOneCategory = jest.fn().mockResolvedValue(mockCategory);
        Category.findOne = mockFindOneCategory;
        const mockCreate = jest.fn().mockResolvedValue({
            id: 1,
            name: "Iphone",
            price: 999,
            stockQuantity: 20,
            categoryId: 1,
        });
        Product.create = mockCreate;

        await ProductController.createProduct("Iphone", 999, 20, "Electronics");

        expect(mockFindOneCategory).toHaveBeenCalledWith({
            where: { name: "Electronics" },
        });
        expect(mockCreate).toHaveBeenCalledWith({
            name: "Iphone",
            price: 999,
            stockQuantity: 20,
            categoryId: 1,
        }, { transaction: expect.any(Object) });
        expect(consoleSpy).toHaveBeenCalledWith("Produit ajouté avec succès !");
    });

    it("getAllProducts should return all products successfully", async () => {
        const mockProducts = [
            {
                id: 1,
                name: "Iphone",
                price: 999,
                stockQuantity: 20,
                category: { name: "Electronics" },
            },
            {
                id: 2,
                name: "Samsung",
                price: 799,
                stockQuantity: 15,
                category: { name: "Electronics" },
            },
        ];
        const mockFindAll = jest.fn().mockResolvedValue(mockProducts);
        Product.findAll = mockFindAll;

        await ProductController.getAllProducts();

        expect(mockFindAll).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("ID: 1, Nom: Iphone, Prix: 999, Quantité: 20, Catégorie: Electronics");
        expect(consoleSpy).toHaveBeenCalledWith("ID: 2, Nom: Samsung, Prix: 799, Quantité: 15, Catégorie: Electronics");
    });

    it("returnProduct should return a product successfully", async () => {
        const mockProduct = {
            id: 1,
            name: "Iphone",
            price: 999,
            stockQuantity: 20,
            category: { name: "Electronics" },
            save: jest.fn().mockResolvedValue()
        };
        const mockFindOne = jest.fn().mockResolvedValue(mockProduct);
        Product.findOne = mockFindOne;

        await ProductController.returnProduct(1, 5);

        expect(mockFindOne).toHaveBeenCalledWith({
            where: { id: 1 },
        });
        expect(mockProduct.stockQuantity).toBe(25);
        expect(mockProduct.save).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("Produit retourné avec succès !");
    }
    );
});