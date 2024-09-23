import React, { useCallback, useEffect, useState } from "react";
import { apiDeleteUsers, apiGetUsers, apiUpdatedUsers } from "apis/user";
import { roles, block } from "utils/contants";
import moment from "moment";
import { InputField, InputForm, Pagination, Select, Button } from "components";
import useDebounce from "hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUser = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [editElm, setEditElm] = useState(null);
  const [users, setUsers] = useState(null);
  const [params] = useSearchParams();
  const [updated, setUpdated] = useState(false);
  const [queries, setQueries] = useState({ q: "" });

  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });

    if (response?.success) setUsers(response);
  };

  const queriesDebounce = useDebounce(queries?.q, 800);
  const render = useCallback(() => {
    setUpdated(!updated);
  }, [updated]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params, updated]);

  const handleUpdate = async (data) => {
    const response = await apiUpdatedUsers(data, editElm?._id);
    if (response.success) {
      setEditElm(null);
      render();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleDelete = (uid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Bạn có muốn xóa không ?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUsers(uid);
        if (response.success) {
          toast.success(response.message);
          render();
        }
      }
    });
  };

  useEffect(() => {
    if (editElm)
      reset({
        role: editElm.role,
        isBlocked: editElm.isBlocked,
      });
  }, [editElm]);

  return (
    <div className="w-full bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-[#c62828] mb-4">Manage Users</h1>
      <div className="flex justify-end mb-4">
        <InputField
          nameKey={"q"}
          value={queries.q}
          setValue={setQueries}
          placeholder={"Search by name or email"}
          isHideLabel
          className="w-1/3"
        />
      </div>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white text-left text-sm uppercase">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users?.userDatas?.map((el, idx) => (
              <tr key={el._id} className="border-b hover:bg-gray-100">
                <td className="text-center py-3">{idx + 1}</td>
                <td className="text-center py-3">
                  {editElm?._id === el?._id ? (
                    <InputForm
                      register={register}
                      defaultValue={editElm?.email}
                      errors={errors}
                      id={"email"}
                      validate={{
                        required: true,
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      }}
                    />
                  ) : (
                    <span>{el.email}</span>
                  )}
                </td>
                <td className="text-center py-3">
                  {editElm?._id === el?._id ? (
                    <InputForm
                      register={register}
                      defaultValue={editElm?.firstname}
                      errors={errors}
                      id={"firstname"}
                      validate={{ required: "Required" }}
                    />
                  ) : (
                    <span>{el.firstname}</span>
                  )}
                </td>
                <td className="text-center py-3">
                  {editElm?._id === el?._id ? (
                    <InputForm
                      register={register}
                      defaultValue={editElm?.lastname}
                      errors={errors}
                      id={"lastname"}
                      validate={{ required: "Required" }}
                    />
                  ) : (
                    <span>{el.lastname}</span>
                  )}
                </td>
                <td className="text-center py-3">
                  {editElm?._id === el?._id ? (
                    <InputForm
                      register={register}
                      defaultValue={editElm?.mobile}
                      errors={errors}
                      id={"mobile"}
                      validate={{
                        required: "Required",
                        pattern: {
                          value: /^(0(?:\d\W*){0,9})$/,
                          message: "Invalid phone number",
                        },
                      }}
                    />
                  ) : (
                    <span>{el.mobile}</span>
                  )}
                </td>
                <td className="text-center py-3">
                  {editElm?._id === el?._id ? (
                    <Select
                      register={register}
                      defaultValue={+el.role}
                      errors={errors}
                      id={"role"}
                      validate={{ required: "Required" }}
                      options={roles}
                    />
                  ) : (
                    <span>{roles.find((role) => +role.code === +el.role)?.value}</span>
                  )}
                </td>
                <td className="text-center py-3">
                  {editElm?._id === el?._id ? (
                    <Select
                      register={register}
                      defaultValue={el.isBlocked ? "Blocked" : "Active"}
                      errors={errors}
                      id={"isBlocked"}
                      options={block}
                    />
                  ) : (
                    <span>{el.isBlocked ? "Blocked" : "Active"}</span>
                  )}
                </td>
                <td className="text-center py-3">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="text-center py-3">
                  {editElm?._id === el._id ? (
                    <span
                      onClick={() => setEditElm(null)}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      Back
                    </span>
                  ) : (
                    <span
                      onClick={() => setEditElm(el)}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      Edit
                    </span>
                  )}
                  <span
                    onClick={() => handleDelete(el._id)}
                    className="text-blue-600 cursor-pointer hover:underline ml-3"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editElm && <Button type="submit" children={"Update"} className="mt-4" />}
      </form>

      <div className="w-full flex items-center mt-4">
        <Pagination totalCount={users?.counts} />
      </div>
    </div>
  );
};

export default ManageUser;