import { useState } from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
} from "@material-tailwind/react";
import { queryClient } from "../index";
import { useDeleteMeal } from "api/mealQueries";

export default function ProductListCard({ product }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const onDeleteMealSuccess = (payload) => {
    queryClient.invalidateQueries(["menu"]);
    setDeleteModalOpen(false); // Fermer la modal après la suppression réussie
  };

  const { mutate } = useDeleteMeal(product._id, onDeleteMealSuccess);

  const handleDelete = () => {
    // Ouvrir la modal de confirmation
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Confirmer la suppression
    mutate();
  };

  const handleCancelDelete = () => {
    // Annuler la suppression en fermant la modal
    setDeleteModalOpen(false);
  };

  return (
    <li class="p-4">
      {/* ... (autre contenu du composant) */}
      <div className="flex flex-row justify-center px-5">
        <ButtonGroup className="flex-nowrap">
          <Button>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </ButtonGroup>
      </div>

      {/* Modal de confirmation */}
      <Modal
        size="sm"
        active={isDeleteModalOpen}
        toggler={() => setDeleteModalOpen(false)}
      >
        <ModalBody>
          <p className="text-base leading-relaxed text-gray-600">
            Êtes-vous sûr de vouloir supprimer ce produit?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="red" buttonType="link" onClick={handleConfirmDelete}>
            Supprimer
          </Button>
          <Button color="gray" buttonType="link" onClick={handleCancelDelete}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </li>
  );
}
