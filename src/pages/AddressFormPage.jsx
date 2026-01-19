import { useParams } from "react-router-dom";
import AddressForm from "../components/form/AddressForm";

const AddressFormPage = () => {
  const { id } = useParams(); // null = tambah | ada = edit

  return (
    <div className="max-w-7xl mx-auto px-6 py-2 pb-10 pt-44 md:pt-40">
      <AddressForm addressId={id} />
    </div>
  );
};

export default AddressFormPage;
