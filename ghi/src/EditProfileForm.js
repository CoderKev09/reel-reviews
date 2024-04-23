// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// const EditProfileModal = ({
//   show,
//   handleClose,
//   handleSave,
//   initialProfile,
// }) => {
//   const [profile, setProfile] = useState(initialProfile);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const onSave = () => {
//     handleSave(profile);
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Profile</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group>
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               type="text"
//               name="username"
//               value={profile.username}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Avatar</Form.Label>
//             <Form.Control
//               type="url"
//               name="avatar"
//               value={profile.avatar}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           {/* Add more fields as needed */}
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={onSave}>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default EditProfileModal;
