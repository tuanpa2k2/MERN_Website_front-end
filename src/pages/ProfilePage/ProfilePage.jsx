import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Upload } from "antd";

import * as message from "../../components/MessageComp/MessageComponent";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slides/userSlide";
import { getBase64 } from "../../until";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import noImage from "../../assets/images/bgr-image/no-image.png";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // lấy user trong redux-store

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    const res = UserService.updateUser(id, access_token, rests);

    return res;
  });

  const { isLoading, isSuccess } = mutation;

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setAddress(user?.address);
    setPhone(user?.phone);
    setCity(user?.city);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      handleUpdateGetDetailsUser(user?.id, user?.access_token);
      message.success("Cập nhập thông tin thành công!");
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleUpdateGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOnchangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleOnchangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setAvatar(file.preview);
  };

  const handleUpdateUser = () => {
    mutation.mutate({
      id: user?.id,
      name,
      email,
      phone,
      address,
      city,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div className="wapper-profilePage">
      <div className="header-profile">👨‍🎓 Thông Tin Người Dùng 👨‍🎓 </div>
      <LoadingComponent isLoading={isLoading}>
        <div className="content-profile">
          <div className="left">
            <div className="img">
              {avatar ? <img src={avatar} alt="avatar" /> : <img src={noImage} alt="noimage" />}
            </div>
            <Upload onChange={handleOnchangeAvatar} maxCount={1} className="upload-file">
              <Button className="btn-chooseFile">Chọn file ảnh của bạn...</Button>
            </Upload>
          </div>
          <div className="right">
            <div className="imput-form">
              <div className="label">Họ và tên:</div>
              <input type="text" value={name} onChange={handleOnchangeName} />
            </div>
            <div className="imput-form">
              <div className="label">Email:</div>
              <input type="email" value={email} onChange={handleOnchangeEmail} />
            </div>
            <div className="imput-form">
              <div className="label">Số điện thoại (+84):</div>
              <input type="text" value={phone} onChange={handleOnchangePhone} />
            </div>
            <div className="imput-form">
              <div className="label">Thành phố:</div>
              <input type="text" value={city} onChange={handleOnchangeCity} />
            </div>
            <div className="imput-form">
              <div className="label">Địa chỉ cụ thể:</div>
              <input type="text" value={address} onChange={handleOnchangeAddress} />
            </div>
            <div className="btn-updateInfo">
              <button onClick={handleUpdateUser}>Cập nhập thông tin</button>
            </div>
          </div>
        </div>
      </LoadingComponent>
    </div>
  );
};

export default ProfilePage;
