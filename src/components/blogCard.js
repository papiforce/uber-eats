import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import blogData from "./blogData.json";

export function BlogCard() {
  return (
    <>
      <div className="flex justify-content-around mt-5">
        {blogData.map((blogItem, index) => (
          <Card key={index} className="max-w-[24rem] mt-5 overflow-hidden">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none"
            >
              <img src={blogItem.image}  alt={blogItem.title} />
            </CardHeader>
            <CardBody>
              <Typography variant="h4" color="blue-gray">
                {blogItem.title}
              </Typography>
              <Typography
                variant="lead"
                color="gray"
                className="mt-3 font-normal"
              >
                <Link to={blogItem.link}>{blogItem.linkText}</Link>
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
