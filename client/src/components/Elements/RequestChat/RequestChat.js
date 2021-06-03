import React, { useEffect, useRef, useState, useContext } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UserCard from "../viewUsers/components/UserCard";
import { searchDoctor } from "../../../api/viewUsers";
import { UserRoleContext } from "../../../context/UserContext";
import getUserInformation from "../../../api/getUserInformation";
import { activeDoctor } from "../../../api/viewUsers";
import "./RequestChat.css";
const socket = io.connect("https://ehealth-api.herokuapp.com/");
const RequestChat = () => {
  const [foundDoctors, setFoundDoctors] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [userInfo, setUserInfo] = useState();

  const getSearchedDoctors = async () => {
    try {
      const { data } = await searchDoctor({ username: searchInput });
      if (data.length !== 0) {
        setFoundDoctors(data);
      } else {
        setSearchInput("");
      }
    } catch (err) {
      console.log(err);
      setSearchInput("");
    }
  };

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const { userRole } = useContext(UserRoleContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserInformation();
        setUserInfo(data);
      } catch (err) {
        console.log(err);
      }
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    fetchUser();
  }, []);

  useEffect(() => {
    const updateDoctorId = async () => {
      if (userInfo) {
        await activeDoctor(userInfo.email, me);
      }
    };
    updateDoctorId();
  }, [userInfo, setUserInfo, me]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
      config: {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      },
      urls: "turn:stun.l.google.com:19302",
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div className="request-chat-container">
      {userRole !== "doctor" && (
        <div className="search-input-container">
          <input
            value={searchInput}
            className="request-chat-search-input"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="doctor name"
          />
          <SearchIcon
            onClick={() => getSearchedDoctors()}
            className="search-icon"
          />
        </div>
      )}
      {foundDoctors.length !== 0 && (
        <div className="found-doctors">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Expertise</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foundDoctors.map((doctor) => {
                  return (
                    <UserCard
                      key={doctor._id}
                      name={doctor.username}
                      email={doctor.email}
                      expertise={doctor.expertise}
                      id={doctor._id}
                      callDoctor={(id) => callUser(id)}
                      requestChat
                      doctorId={doctor.callid}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            ) : null}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
        <div className="call-button">
          {callAccepted && !callEnded && (
            <Button variant="contained" color="secondary" onClick={leaveCall}>
              End Call
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestChat;
