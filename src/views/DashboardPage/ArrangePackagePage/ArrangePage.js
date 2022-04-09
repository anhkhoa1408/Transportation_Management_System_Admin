import { Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import packageApi from "../../../api/packageApi";
import shipmentApi from "../../../api/shipmentApi";
import { validateFit } from "../../../services/packing";
import { errorNotify, successNotify } from "../../../utils/notification";
import useScroll from "../../../hooks/useScroll";
import { ArrangePack } from "./Components/ArrangePack";
import { Edit } from "./Components/Edit";

const Customer = (props) => {
  const [initial, setInitial] = useState({
    pack: [],
    ship: [],
  });

  const [check, setCheck] = useState(false);

  const [search, setSearch] = useState(false);
  const [split, setSplit] = useState(null);

  const [storage, setSelectedStorage] = useState("");
  const [storages, setStorages] = useState([]);

  const [listFrom, setListFrom] = useState([]);
  const [from, setFrom] = useState("");

  const [listTo, setListTo] = useState([]);
  const [to, setTo] = useState("");

  const [car, setCar] = useState("");
  const [cars, setCars] = useState([]);

  const [assistance, setAssistance] = useState("");
  const [assistances, setAssistances] = useState([]);

  const [type, setType] = useState("");

  const [packageData, setPackages] = useState([]);
  const [shipmentData, setShipments] = useState([]);

  const [arrangePack, setArrange] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [validate, setValidate] = useState({});

  const [curWeight, setCurWeight] = useState(0);
  const [curVolume, setCurVolume] = useState(0);

  const handleSplit = (item, index) => {
    let tempArray = [...packageData];
    let tempPack = {
      ...tempArray[index],
      quantity: quantity,
    };
    tempArray[index] = {
      ...tempArray[index],
      quantity: tempArray[index].quantity - quantity,
    };
    tempArray.splice(tempArray.length, 0, tempPack);
    setPackages(tempArray);
    setSplit(null);
    setArrange([...arrangePack, tempArray[index]]);
    setQuantity(1);
  };

  const handleCreate = () => {
    if (!arrangePack.length) {
      errorNotify("Chưa thêm kiện hàng");
      return;
    }
    if (!assistance) {
      errorNotify("Chưa thêm nhân viên hỗ trợ");
      return;
    }
    if (!Object.keys(from).length || !Object.keys(to).length) {
      errorNotify("Chưa thêm địa chỉ chuyến xe");
      return;
    }

    if (arrangePack.length) {
      let pack = arrangePack.map(item => item.id)

      let shipmentData = {
        from_address: {
          street: from.address.street,
          ward: from.address.ward,
          province: from.address.province,
          city: from.address.city,
          latitude: from.address.latitude,
        },
        to_address: {
          street: to.address.street,
          ward: to.address.ward,
          province: to.address.province,
          city: to.address.city,
          longitude: to.address.longitude,
          latitude: to.address.latitude,
        },
        driver: car.manager.id,
        assistance: assistance,
        packages: pack,
        car: car.id,
        from_storage: from.id
      };

      shipmentData = type === "collect" || type === "ship" ? shipmentData : {
        ...shipmentData,
        to_storage: to.id
      }

      let shipmentItems = arrangePack.map((item) => ({
        package: item.id,
        quantity: item.quantity,
        received: 0,
      }));

      shipmentApi
        .create({
          shipmentData,
          shipmentItems,
        })
        .then((response) => {
          successNotify("Tạo chuyến xe thành công");
          setCar("");
          setType("");
          setSelectedStorage("");
          setFrom("");
          setTo("");
          setAssistance("");
          setShipments([]);
          setPackages([]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleQuickSort = () => {
    if (!car) {
      errorNotify("Chưa chọn xe vận chuyển");
      return;
    }

    let isInvalidAll =
      Object.keys(validate).length &&
      packageData.every(
        (item) => validate[item.id] && item.quantity === validate[item.id],
      );

    if (Object.keys(validate).length && !isInvalidAll && !check) {
      let tempShip = [];
      let tempPack = [];
      for (let item of packageData) {
        let unfitPack = packageData.find(
          (pack) =>
            pack.id === Object.keys(validate).find((id) => id === item.id),
        );
        if (!unfitPack) {
          tempShip.push(item);
        } else {
          let unshipPack = {
            ...unfitPack,
            quantity: validate[unfitPack.id],
          };
          tempPack.push(unshipPack);

          if (unfitPack.quantity - validate[unfitPack.id]) {
            let shipPack = {
              ...unfitPack,
              quantity: unfitPack.quantity - validate[unfitPack.id],
            };
            tempShip.push(shipPack);
          }
        }
      }
      setShipments([...shipmentData, ...tempShip]);
      setPackages(tempPack);
      setArrange(tempShip);
    } else if (!Object.keys(validate).length || check) {
      setShipments([...shipmentData, ...packageData]);
      setPackages([]);
      setArrange(packageData);
    }
  };

  const handleValidate = (packages, car) => {
    let unfitPack = validateFit(packages, car);
    setValidate(unfitPack);

    let temp = packages.reduce((total, item) => {
      if (unfitPack[item.id]) {
        total.push({
          ...item,
          quantity: item.quantity - unfitPack[item.id],
        });
      } else {
        total.push(item);
      }
      return total;
    }, []);

    let totalWeight = temp.length
      ? temp.reduce((total, item) => {
          return total + item.quantity * item.weight;
        }, 0)
      : packages.reduce((total, item) => {
          return total + item.quantity * item.weight;
        }, 0);

    let totalVolume = temp.length
      ? temp.reduce((total, item) => {
          return (
            total +
            item.quantity * item.size.len * item.size.width * item.size.height
          );
        }, 0)
      : packages.reduce((total, item) => {
          return (
            total +
            item.quantity * item.size.len * item.size.width * item.size.height
          );
        }, 0);

    setCurWeight(totalWeight);
    setCurVolume(
      parseFloat(
        (totalVolume * 100) / (car.size.len * car.size.width * car.size.height),
      ).toFixed(2),
    );
  };

  useEffect(() => {
    setArrange([]);
    if (car && car.shipments) {
      if (car.shipments.length) {
        setAssistance(car.shipments[car.shipments.length - 1].assistance);
      }
      let temp = car.shipments
        .map((item) => item.packages)
        .reduce((total, item) => {
          return [...total, ...item];
        }, []);

      shipmentApi
        .getItemList({
          "shipment.car": car.id,
          "shipment.arrived_time_null": true,
        })
        .then((response) => {
          let presentPack = response.map((item) => ({
            ...item.package,
            quantity: item.quantity,
          }));
          setShipments(presentPack);
          setPackages(packageData);
          handleValidate([...presentPack, ...packageData], car);
          setInitial({
            pack: packageData,
            ship: presentPack,
          });
        });
      // console.log(car.shipments.shipment_items)
      // Promise.all(temp.map((item) => packageApi.getDetail(item)))
      //   .then((response) => {
      //     setPackages(packageData);
      //     setShipments(response);
      //     handleValidate([...response, ...packageData], car);
      //     setInitial({
      //       pack: packageData,
      //       ship: response,
      //     });
      //   })
      //   .catch((error) => {
      //     errorNotify("Có lỗi xảy ra 5");
      //   });
    }
  }, [car]);

  useScroll("detail-header");

  return (
    <Grid container className="p-5">
      <Grid item sm={12} md={12} className="pt-4 header-sticky">
        <Paper
          id="detail-header"
          className="d-flex flex-row justify-content-between align-items-center px-4 py-3 shadow mb-4"
        >
          <Typography variant="h5">Sắp xếp</Typography>
          <Button onClick={handleCreate} variant="outlined">
            Tạo
          </Button>
        </Paper>
      </Grid>

      <Edit
        storage={storage}
        setSelectedStorage={setSelectedStorage}
        storages={storages}
        setStorages={setStorages}
        type={type}
        setType={setType}
        from={from}
        setFrom={setFrom}
        listFrom={listFrom}
        setListFrom={setListFrom}
        to={to}
        setTo={setTo}
        listTo={listTo}
        setListTo={setListTo}
        setPackages={setPackages}
        car={car}
        setCar={setCar}
        cars={cars}
        setCars={setCars}
        assistance={assistance}
        setAssistance={setAssistance}
        assistances={assistances}
        setAssistances={setAssistances}
      />

      <ArrangePack
        curVolume={curVolume}
        curWeight={curWeight}
        car={car}
        type={type}
        check={check}
        setCheck={setCheck}
        search={search}
        setSearch={setSearch}
        split={split}
        setSplit={setSplit}
        quantity={quantity}
        setQuantity={setQuantity}
        shipmentData={shipmentData}
        setShipments={setShipments}
        packageData={packageData}
        setPackages={setPackages}
        validate={validate}
        setValidate={setValidate}
        handleQuickSort={handleQuickSort}
        handleSplit={handleSplit}
        initial={initial}
      />
    </Grid>
  );
};

export default Customer;
