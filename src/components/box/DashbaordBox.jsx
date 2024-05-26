import { Box, Typography, Stack } from "@mui/material";

const DashboardBox = (props) => {
  return (
    <Box
      width={"100"}
      my={3}
      px={4}
      py={2}
      borderRadius={2}
      sx={{
        border: "1px solid #ccc",
        boxShadow: `2px 2px 10px ${props.shadowColor}`,
      }}
    >
      <Stack direction="row" alignItems={"center"}>
        {props.icon}
        <Typography variant="p" ml={1}>
          {props.name}
        </Typography>
      </Stack>
      <p className="mt-1 text-gray-800">{props.date}</p>
      <Typography variant="h3" mt={1}>
        {props.count}
      </Typography>
    </Box>
  );
};

export default DashboardBox;
