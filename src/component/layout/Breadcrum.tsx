import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface Props {
  title?: string[];
}

export default function Breadcrum(props: Props) {
  const titlesize = props.title?.length;
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        {props.title?.map((val: string, index: number) => {
          return (
            <div key={val}>
              {index + 1 == titlesize ? (
                <Typography color="text.primary">{val}</Typography>
              ) : (
                <Link
                  underline="hover"
                  color="inherit"
                >
                  {val}
                </Link>
              )}
            </div>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
