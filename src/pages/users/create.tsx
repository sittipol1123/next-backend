import React from "react";
import Paperbase from "@/component/layout";
import { useState } from "react";
import { useSession } from "next-auth/react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SendIcon from "@mui/icons-material/Send";
import Breadcrum from "@/component/layout/Breadcrum";
import CardHeader from "@mui/material/CardHeader";

interface Users {
  name?: string;
  email?: string;
  role?: string;
  username?: string;
  password?: string;
  token?: string;
}

export default function create() {
  const arr = ["จัดการผู้ใช้งาน", "เพิ่มผู้ใช้"];
  const session = useSession();
  const [data, setData] = useState<Users | null>({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    token: "",
  });
  const confirmsubmit = async () => {
    setData({ ...data, token: session.data?.accessToken });
    console.log(JSON.stringify(data));
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Access-Control-Allow-Origin": "*","Content-Type": "application/json" },
    });
    console.log(res);
  };

  return (
    <Paperbase>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          {/* <h4>เพิ่มผู้ใช้งาน</h4> */}
          <Breadcrum title={arr}></Breadcrum>
        </CardContent>
      </Card>
      <Box component="form">
        <Card>
          <CardContent>
            เพิ่มผู้ใช้งาน
            <TextField
              margin="normal"
              fullWidth
              required
              id="name"
              label="name"
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setData({ ...data, name: e.target.value });
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setData({ ...data, email: e.target.value });
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="username"
              label="username"
              name="username"
              //   autoComplete="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setData({ ...data, username: e.target.value });
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="password"
              label="password"
              name="password"
              // autoComplete="password"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data?.role}
                label="role"
                onChange={(e: SelectChangeEvent) => {
                  setData({ ...data, role: e.target.value });
                }}
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ marginTop: 2 }}
              onClick={confirmsubmit}
            >
              Send
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Paperbase>
  );
}
