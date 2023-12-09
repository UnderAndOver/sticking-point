//creating profile page for user
//will allow user to edit image, display name, username and delete account
//use MUI components for this
//have input fields filled with current user data but editable and have a save button
//also do an auth check with next-auth
//label + input box

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/authOptions";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect("/api/auth/signin");
  }

  return (
    <>
      <Box>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <TextField id="outlined-basic" label="Name" variant="outlined" />
        </FormControl>
      </Box>
    </>
  );
}
