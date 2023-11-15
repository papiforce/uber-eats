// AddProduct.js
import { useState } from "react";
import axios from "axios"; // Importez Axios

export default function AddProduct({ onAddProduct, onSuccess }) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPhoto, setProductPhoto] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productTime, setProductTime] = useState("");
  console.log(typeof productPrice);

  const handleAddProduct = async () => {
    // Validation du formulaire
    if (!productName.trim()) {
      alert("Veuillez entrer un nom de produit valide");
      return;
    }

    // Convertissez les valeurs en nombres
    const priceAsNumber = parseFloat(productPrice);
    const timeAsNumber = parseInt(productTime);

    try {
      // Effectuez la requête Axios vers votre API
      const response = await axios.post("http://localhost:4400/api/meals", {
        name: productName,
        description: productDescription,
        price: priceAsNumber,
        time: timeAsNumber,
        photo: productPhoto,
      });

      // Récupérez le nouveau produit depuis la réponse
      const newProduct = response.data;

      // Appel de la fonction de callback pour ajouter le produit
      onAddProduct(newProduct);

      // Appel de la fonction onSuccess
      if (onSuccess) {
        onSuccess();
      }

      // Réinitialiser les champs du formulaire après l'ajout
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductTime("");
      setProductPhoto("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nom du produit"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Temps de préparation (en minutes)"
        value={productTime}
        onChange={(e) => setProductTime(e.target.value)}
      />
      <input
        type="file"
        placeholder="Photo"
        value={productPhoto}
        onChange={(e) => setProductPhoto(e.target.value)}
      />
      <button onClick={handleAddProduct}>Ajouter</button>
    </div>
  );
}
