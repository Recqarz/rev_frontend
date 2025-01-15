import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/Navbar";
import Table from "../../../components/Table";
import { getAllUserData } from "../../../redux/users/userAction";

const AllUser = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.allUserReducer.data);

  useEffect(() => {
    dispatch(getAllUserData());
  }, [dispatch]);



  return (
    <div className="w-full">
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <Table
          allUser={allUser}
        />
    </div>
  );
};

export default AllUser;
