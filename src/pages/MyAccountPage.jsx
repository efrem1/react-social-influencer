import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Close, Check, Edit, MoreHoriz } from "@mui/icons-material";
import env from "react-dotenv";
import BrandLayout from "../layouts/BrandLayout";
import { useAuth } from "../auth";
import { API_URL } from "../Api";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51K29x2BQPxmNdQzjobGn7FnHRBcgntOjIxRC94FcgSnhTb2Z3ssuMZ5KL5XJOsq9JGhja7q8l7u6EfgLRsCpgB3I00xjHot5Ns");

export default function MyAccountPage() {
  const {
    user: { id },
  } = useAuth();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((profile) => {
        setProfile(profile);
      })
      .catch((error) => {
        console.log("------->", error);
      });
  }, [id]);

  if (!profile) {
    return (
      <BrandLayout>
        <Container maxWidth="md" sx={{ p: 2 }}></Container>
      </BrandLayout>
    );
  }
  return (
    <BrandLayout>
      <Container maxWidth="md" sx={{ p: 2 }}>
        <ContactForm profile={profile} />
        <PasswordForm profile={profile} />
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
        <CompanyForm company={profile.company} />
      </Container>
    </BrandLayout>
  );
}

const CompanyForm = ({ company }) => {
  const [editCompany, setEditCompany] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    name: company.name,
  });
  const onChange = ({ target: { name, value } }) => {
    setCompanyForm((prevState) => ({ ...prevState, [name]: value }));
  };
  const openEdit = () => {
    setEditCompany(true);
  };
  const closeEdit = () => {
    setEditCompany(false);
  };
  const submitEdit = () => {
    fetch(`${API_URL}/updatecompany/${company.id}`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(companyForm),
    })
      .then((res) => res.json())
      .then((company) => {
        setCompanyForm({
          name: company.name,
        });
      })
      .catch((error) => {
        console.log("-------->", error);
      })
      .finally(() => {
        closeEdit();
      });
  };
  return (
    <Paper sx={{ p: 1, m: 1 }}>
      <TitleRow
        title="Company details"
        onClick={openEdit}
        onClose={closeEdit}
        onSubmit={submitEdit}
        edit={editCompany}
      />
      <Grid container>
        <RowEdit
          title="Comapany name"
          value={companyForm.name}
          edit={editCompany}
          name="name"
          onChange={onChange}
        />
      </Grid>
    </Paper>
  );
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [editPayment, setEditPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({});
  const onChange = ({ target: { name, value } }) => {
    setPaymentForm((prevState) => ({ ...prevState, [name]: value }));
  };
  const openEdit = () => {
    setEditPayment(true);
  };
  const closeEdit = () => {
    setEditPayment(false);
  };
  const submitEdit = () => {
    alert("submit");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };
  return (
    <Paper sx={{ p: 1, m: 1 }}>
      {/* <TitleRow
        title="Payment details"
        onClick={openEdit}
        onClose={closeEdit}
        onSubmit={submitEdit}
        edit={editPayment}
      /> */}
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
      </form>
    </Paper>
  );
};

const PasswordForm = ({ profile }) => {
  const [editPassword, setEditPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    password: "",
  });
  const onChange = ({ target: { name, value } }) => {
    setPasswordForm((prevState) => ({ ...prevState, [name]: value }));
  };
  const openEdit = () => {
    setEditPassword(true);
  };
  const closeEdit = () => {
    setEditPassword(false);
  };
  const submitEdit = () => {
    fetch(`${API_URL}/updatecontact/${profile.id}`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(passwordForm),
    })
      .then((res) => res.json())
      .then((user) => {
        setPasswordForm({
          password: user.password,
        });
      })
      .catch((error) => {
        console.log("-------->", error);
      })
      .finally(() => {
        closeEdit();
      });
  };
  return (
    <Paper sx={{ p: 1, m: 1 }}>
      <TitleRow
        title="Password"
        onClick={openEdit}
        onClose={closeEdit}
        onSubmit={submitEdit}
        edit={editPassword}
      />
      <Grid container>
        <RowEdit
          title="Password"
          value={passwordForm.password}
          edit={editPassword}
          name="password"
          password
          onChange={onChange}
        />
      </Grid>
    </Paper>
  );
};

const ContactForm = ({ profile }) => {
  const [editContact, setEditContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
  });
  const onChange = ({ target: { name, value } }) => {
    setContactForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const openEdit = () => {
    setEditContact(true);
  };
  const closeEdit = () => {
    setEditContact(false);
  };
  const submitEdit = () => {
    fetch(`${API_URL}/updatecontact/${profile.id}`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(contactForm),
    })
      .then((res) => res.json())
      .then((user) => {
        setContactForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        });
      })
      .catch((error) => {
        console.log("-------->", error);
      })
      .finally(() => {
        closeEdit();
      });
  };
  return (
    <Paper sx={{ p: 1, m: 1 }}>
      <TitleRow
        title="Contact Details"
        onClick={openEdit}
        onClose={closeEdit}
        onSubmit={submitEdit}
        edit={editContact}
      />
      <Grid container>
        <RowEdit
          title="First name"
          value={contactForm.firstName}
          edit={editContact}
          name="firstName"
          onChange={onChange}
        />
        <RowEdit
          title="Last name"
          value={contactForm.lastName}
          edit={editContact}
          name="lastName"
          onChange={onChange}
        />
        <RowEdit
          title="Email"
          name="email"
          value={contactForm.email}
          edit={editContact}
          onChange={onChange}
        />
        <RowEdit
          title="Phone"
          name="phone"
          value={contactForm.phone}
          edit={editContact}
          onChange={onChange}
        />
      </Grid>
    </Paper>
  );
};

const RowEdit = ({
  title,
  value,
  edit = false,
  name,
  onChange,
  password = false,
}) => {
  return (
    <>
      <Grid item sm={4} sx={{ p: 1 }}>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item sm={4} sx={{ p: 1 }}>
        {edit ? (
          <TextField
            variant="standard"
            color="secondary"
            size="small"
            name={name}
            placeholder={title}
            value={value}
            onChange={onChange}
          />
        ) : password ? (
          <>
            <MoreHoriz />
            <MoreHoriz />
          </>
        ) : (
          <Typography>{value}</Typography>
        )}
      </Grid>
      <Grid item sm={2} sx={{ p: 1 }} />
    </>
  );
};

const TitleRow = ({ title, onClick, edit = false, onClose, onSubmit }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6">{title}</Typography>
      {edit ? (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          <IconButton onClick={onSubmit}>
            <Check />
          </IconButton>
        </Box>
      ) : (
        <IconButton onClick={onClick}>
          <Edit fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};
