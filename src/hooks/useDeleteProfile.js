import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../setup/firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const useDeleteProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userImg, setUserImg] = useState();
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState();
  const [loader, setLoader] = useState(false);

  const [edit, setEdit] = useState({
    type: "time",
    user: [],
    name: "",
    fatherName: "",
    DateBirth: "",
    Email: "",
    cninc: "",
    Mobile: "",
    time: "",
    Course: "",
    EditedId: "",
    loading: false,
    deleteId: "",
  });

  useEffect(() => {
    setEdit(true);
    const getAllData = async () => {
      const docRef = doc(db, "students", params.id);
      const targetDoc = await getDoc(docRef);
      console.log(targetDoc.data());
      return { user: setEdit(targetDoc.data()) };
    };

    getAllData();
    setEdit(false);
    names();
  }, []);
  const names = async () => {
    if (value !== "") {
      if (value === edit.name) {
        await deleteDoc(doc(db, "students", params.id));
        setEdit(params.id);
        navigate("/students/students");
      } else if (value !== edit.name) {
        console.log(edit.name);
      } else {
        console.log("");
        return false;
      }
    }
  };

  const handleDeletingTicket = async () => {
    await deleteDoc(doc(db, "students", params.id));
    setEdit(params.id);
    navigate("/students/students");
  };

  const userImgUpload = () => {
    // if (!userImg) return;
    // const imageRef = ref(storage, `user/${uiid}/${userImg.name}`);
    // uploadBytes(imageRef, userImg).then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then((url) => {
    //     setImageUpload(url);
    //     setUserImg(false);
    //   });
    // });
    // editFunction();
  };

  useEffect(() => {
    setLoading(true);
    const upLoadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, `user-images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUserImg(downloadURL);
            updateDoc(doc(db, "students", params.id), {
              img: downloadURL,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
        },
      );
    };

    // setImages();

    file && upLoadFile();
  }, [file]);

  // const setImages = async () => {
  //   setLoading(true);
  //   await updateDoc(doc(db, "students", params.id), {
  //     image: userImg,
  //   });
  //   setLoading(false);
  // };

  // const editFunction = async (userId) => {
  //   if (imageUpload !== undefined) {
  //     setLoading(true);
  //     await updateDoc(doc(db, "students", params.id), {
  //       image: imageUpload,
  //     });
  //     setEditedId(userId);
  //     setLoading(false);
  //   }
  // };
  return {
    edit,
    handleDeletingTicket,
    userImgUpload,
    userImg,
    // setImages,
    file,
    setFile,
    loading,
    setValue,
    progress,
    loader,
  };
};

export default useDeleteProfile;
