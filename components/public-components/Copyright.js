import Typography from "@mui/material/Typography";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © 2022 Astig. Allrights reserve "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
