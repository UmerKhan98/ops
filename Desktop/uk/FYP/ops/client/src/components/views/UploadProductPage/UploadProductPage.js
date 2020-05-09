import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Paper Print" },
  { key: 2, value: "Mug Printing" },
  { key: 3, value: "Wedding Card Design" },
  { key: 4, value: "Business Card Design" },
  { key: 5, value: "Illustration Design" },
  { key: 6, value: "Banners Design" },
  { key: 7, value: "Brouchers" },
];

const Areas = [
  { key: 1, value: "Gulshan e Iqbal Block 13-A" },
  { key: 2, value: "Gulshan e Iqbal Block 13-B" },
  { key: 3, value: "Gulshan e Iqbal Block 13-C" },
  { key: 4, value: "Gulshan e Iqbal Block 13-D" },
  { key: 5, value: "Gulshan e Iqbal Block 13-E" },
  { key: 6, value: "Gulshan e Iqbal Block 13-F" },
  { key: 7, value: "Gulshan e Iqbal Block 13-G" },
  { key: 8, value: "Gulshan e Iqbal Block 13-H" },
  { key: 9, value: "Gulshan e Iqbal Block 13-I" },
  { key: 10, value: "gulshan e iqbal block 1" },
  { key: 11, value: "gulshan e iqbal block 2" },
  { key: 12, value: "gulshan e iqbal block 3" },
  { key: 13, value: "gulshan e iqbal block 4" },
  { key: 14, value: "gulshan e iqbal block 5" },
  { key: 15, value: "gulshan e iqbal block 6" },
  { key: 16, value: "gulshan e iqbal block 7" },
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);
  const [AreasValue, setAreasValue] = useState(1);

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const onAreasSelectChange = (event) => {
    setAreasValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !ContinentValue ||
      !AreasValue ||
      !Images
    ) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      continents: ContinentValue,
      areas: AreasValue,
    };

    Axios.post("/api/product/uploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("Product Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Your Shop</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price(Rs.)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <label>Services</label>
        <br />
        <select onChange={onContinentsSelectChange}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>Areas</label>
        <br />
        <select onChange={onAreasSelectChange}>
          {Areas.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
