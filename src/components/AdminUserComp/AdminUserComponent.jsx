import React, { useEffect, useState } from "react";
import TableComponent from "../TableComp/TableComponent";
import { AiOutlinePlusCircle, AiOutlineSetting, AiOutlineCloudUpload } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import { BsPen, BsTrash } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import "./AdminUserComponent.scss";
import ModalComponent from "../ModalComp/ModalComponent";
import { Button, Form, Input, Upload } from "antd";
import { getBase64 } from "../../until";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComp/MessageComponent";
import LoadingComponent from "../LoadingComp/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import DrawerComponent from "../DrawerComp/DrawerComponent";

const AdminUserComponent = () => {
  const user = useSelector((state) => state?.user);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    phone: "",
    address: "",
    city: "",
    avatar: "",
  });

  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    email: "",
    isAdmin: false,
    phone: "",
    address: "",
    city: "",
    avatar: "",
  });

  // -----------------------------------------------------------------------------------------------------------------------
  const mutationCreate = useMutationHooks((data) => {
    const { name, email, password, confirmPassword, isAdmin, phone, address, city, avatar } = data;
    const res = UserService.createUser({
      name,
      email,
      password,
      confirmPassword,
      isAdmin,
      phone,
      address,
      city,
      avatar,
    });

    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, token, rests);

    return res;
  });
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);

    return res;
  });
  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = UserService.deleteManyUser(ids, token);

    return res;
  });

  // Handle API ---------------------------------------------------------------------------
  const getUserAll = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };
  const getDetailUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected, user?.access_token);

    if (res?.data) {
      setStateUserDetail({
        name: res?.data?.name,
        email: res?.data?.email,
        isAdmin: res?.data?.isAdmin,
        phone: res?.data?.phone,
        address: res?.data?.address,
        city: res?.data?.city,
        avatar: res?.data?.avatar,
      });
    }

    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      getDetailUser(rowSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelected, isOpenDrawer]);

  // -----------------------------------------------------------------------------------------------------------------------
  const { data: dataCreate, isSuccess: isSuccessCreate, isLoading: isLoadingCreate } = mutationCreate;
  const { data: dataUpdated, isSuccess: isSuccessUpdated, isLoading: isLoadingUpdated } = mutationUpdate;
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted } = mutationDeleted;
  const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany } = mutationDeletedMany;

  const queryUser = useQuery(["users"], getUserAll, {
    retry: 3,
    retryDelay: 1000,
  });
  const { data: users, isLoading: isLoadingUser } = queryUser;

  // -----------------------------------------------------------------------------------------------------------------------
  const renderIconAction = () => {
    return (
      <div className="wrapper-iconAction">
        <Tippy content="Chi tiết">
          <div className="bsPen" onClick={() => setIsOpenDrawer(true)}>
            <BsPen />
          </div>
        </Tippy>

        <Tippy content="Xóa">
          <div className="mdDelete" onClick={() => setIsModalOpenDelete(true)}>
            <BsTrash />
          </div>
        </Tippy>
      </div>
    );
  };
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
    },
    {
      title: "Email ",
      dataIndex: "email",
    },
    {
      title: "Quyền truy cập ",
      dataIndex: "isAdmin",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Hình ảnh",
      dataIndex: "avatar",
      render: (img) => (
        <div className="data-image">
          <img src={img} alt="" />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: renderIconAction,
    },
  ];
  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return { ...user, key: user._id, isAdmin: user.isAdmin ? "True" : "False" };
    });

  // -----------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (isSuccessCreate && dataCreate?.status === "OK") {
      message.success("Thêm nguời dùng thành công");
      handleCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCreate]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhập nguời dùng thành công");
      handleCloseDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success("Xóa người dùng thành công");
      handleCancelDelete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success("Xóa người dùng thành công");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessDeletedMany]);

  // -----------------------------------------------------------------------------------------------------------------------
  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangedetails = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------------------------------------------------------------------------------------------------
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateUser({
      ...stateUser,
      avatar: file.preview,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateUserDetail({
      ...stateUserDetail,
      avatar: file.preview,
    });
  };

  // Handle close (open) các modal, icons ----------------------------------------------------------------------------------
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
      phone: "",
      address: "",
      city: "",
      avatar: "",
    });

    form.resetFields();
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetail({
      name: "",
      email: "",
      isAdmin: false,
      phone: "",
      address: "",
      city: "",
      avatar: "",
    });
    form.resetFields();
  };

  // Nhận và xử lý mutate() trong react-query ------------------------------------------------------
  const onFinish = () => {
    mutationCreate.mutate(stateUser, {
      onSettled: () => {
        queryUser.refetch(); // Tự động load data khi thêm mới 1 sản phẩm
      },
    });
  };
  const onDeleteUser = () => {
    mutationDeleted.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          queryUser.refetch(); // Tự động load data khi Delete 1 sản phẩm
        },
      }
    );
  };
  const onUpdateUser = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateUserDetail,
      },
      {
        onSettled: () => {
          queryUser.refetch(); // Tự động load data khi Update mới 1 sản phẩm
        },
      }
    );
  };
  const handleDeleteManyUsers = (ids) => {
    mutationDeletedMany.mutate(
      {
        ids: ids,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          queryUser.refetch(); // Tự động load data khi Update mới 1 sản phẩm
        },
      }
    );
  };

  return (
    <div className="wapper-adminUserComp">
      <div className="right-content-header">
        <h3>
          <AiOutlineSetting />
          Quản lý thông tin người dùng
        </h3>
        <button onClick={() => setIsModalOpen(true)}>
          <AiOutlinePlusCircle />
          Thêm mới người dùng
        </button>
      </div>
      <div className="right-content-table">
        <TableComponent
          handleDeleteMany={handleDeleteManyUsers}
          columns={columns}
          data={dataTable}
          isLoading={isLoadingUser}
          onRow={(record) => {
            return {
              onClick: () => {
                setRowSelected(record._id); //Lấy cái id trong cái Row khi click
              },
            };
          }}
        />
      </div>

      {/* --------------------------------------------------------------------------------------- */}
      <ModalComponent
        title="Tạo mới người dùng"
        forceRender
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }} // Ẩn button OK trong ant design
        centered
        width={800}
      >
        <LoadingComponent isLoading={isLoadingCreate}>
          <Form>
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              initialValues={{ remember: true }}
              autoComplete="on"
              form={form}
            >
              <Form.Item label="Email truy cập" name="email">
                <Input
                  type="email"
                  name="email"
                  value={stateUser.email}
                  onChange={handleOnchange}
                  placeholder="vd: abc@gmail.com"
                />
              </Form.Item>

              <Form.Item label="Mật khẩu" name="password">
                <Input
                  type="password"
                  name="password"
                  value={stateUser.password}
                  onChange={handleOnchange}
                  placeholder="..."
                />
              </Form.Item>

              <Form.Item label="Nhập lại mật khẩu" name="confirmPassword">
                <Input
                  type="password"
                  name="confirmPassword"
                  value={stateUser.confirmPassword}
                  onChange={handleOnchange}
                  placeholder="..."
                />
              </Form.Item>

              <Form.Item label="Quyền truy cập" name="isAdmin">
                <Input
                  name="isAdmin"
                  value={stateUser.isAdmin}
                  onChange={handleOnchange}
                  placeholder="false or true (default: false)"
                />
              </Form.Item>

              <Form.Item label="Tên người dùng" name="name">
                <Input name="name" value={stateUser.name} onChange={handleOnchange} placeholder="..." />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone">
                <Input name="phone" value={stateUser.phone} onChange={handleOnchange} placeholder="..." />
              </Form.Item>

              <Form.Item label="Tỉnh (thành phố)" name="city">
                <Input name="city" value={stateUser.city} onChange={handleOnchange} placeholder="..." />
              </Form.Item>

              <Form.Item label="Địa chỉ chi tiết" name="address">
                <Input name="address" value={stateUser.address} onChange={handleOnchange} placeholder="..." />
              </Form.Item>

              <Form.Item label="Hình ảnh sản phẩm" name="avatar">
                <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                  <Button icon={<AiOutlineCloudUpload />}>Chọn file ảnh của bạn</Button>
                </Upload>
                {stateUser?.avatar && (
                  <div className="image-modal">
                    <img src={stateUser?.avatar} alt="avatar" />
                  </div>
                )}
              </Form.Item>

              <Form.Item name="button-submit" wrapperCol={{ offset: 8, span: 16 }}>
                <div className="btn-createUser" onClick={onFinish}>
                  Tạo người dùng
                </div>
              </Form.Item>
            </Form>
          </Form>
        </LoadingComponent>
      </ModalComponent>

      {/* --------------------------------------------------------------------------------- */}
      <ModalComponent
        forceRender
        title="Xóa Dữ Liệu"
        open={isModalOpenDelete}
        onOk={onDeleteUser}
        onCancel={handleCancelDelete}
        width={400}
      >
        <LoadingComponent isLoading={isLoadingDeleted}>
          <div style={{ display: "grid", justifyItems: "center", paddingBottom: "20px" }}>
            <span style={{ fontSize: "1.8rem" }}>Bạn có chắc xóa sản phẩm này không?</span>
            <CiWarning style={{ fontSize: "100px", color: "yellow" }} />
          </div>
        </LoadingComponent>
      </ModalComponent>

      {/* --------------------------------------------------------------------------------------- */}
      <DrawerComponent
        title="Chi tiết thông tin người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="70%"
      >
        <LoadingComponent isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} autoComplete="on" form={form}>
            <Form.Item label="Email truy cập" name="email">
              <Input
                type="email"
                name="email"
                value={stateUserDetail.email}
                onChange={handleOnchangedetails}
                placeholder="vd: abc@gmail.com"
              />
            </Form.Item>

            <Form.Item label="Quyền truy cập" name="isAdmin">
              <Input
                name="isAdmin"
                value={stateUserDetail.isAdmin}
                onChange={handleOnchangedetails}
                placeholder="false or true (default: false)"
              />
            </Form.Item>

            <Form.Item label="Tên người dùng" name="name">
              <Input name="name" value={stateUserDetail.name} onChange={handleOnchangedetails} placeholder="..." />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phone">
              <Input name="phone" value={stateUserDetail.phone} onChange={handleOnchangedetails} placeholder="..." />
            </Form.Item>

            <Form.Item label="Tỉnh (thành phố)" name="city">
              <Input name="city" value={stateUserDetail.city} onChange={handleOnchangedetails} placeholder="..." />
            </Form.Item>

            <Form.Item label="Địa chỉ chi tiết" name="address">
              <Input
                name="address"
                value={stateUserDetail.address}
                onChange={handleOnchangedetails}
                placeholder="..."
              />
            </Form.Item>

            <Form.Item label="Hình ảnh sản phẩm" name="avatar">
              <Upload onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button icon={<AiOutlineCloudUpload />}>Chọn file ảnh của bạn</Button>
              </Upload>
              {stateUserDetail?.avatar && (
                <div className="image-modal">
                  <img src={stateUserDetail?.avatar} alt="avatar" />
                </div>
              )}
            </Form.Item>

            <Form.Item name="button-submit" wrapperCol={{ offset: 8, span: 16 }}>
              <div onClick={onUpdateUser} className="btn-createUser">
                Cập nhập thông tin
              </div>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>
    </div>
  );
};

export default AdminUserComponent;
