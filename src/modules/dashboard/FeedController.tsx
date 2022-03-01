import { Room, ScheduledRoom, User,UserPreview } from "../ws/entities";
import isElectron from "is-electron";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { number } from "superstruct";
import { useCurrentRoomIdStore } from "../../global-stores/useCurrentRoomIdStore";
import { useDownloadAlertStore } from "../../global-stores/useDownloadAlertStore";
import { isServer } from "../../lib/isServer";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { FeedHeader } from "../../ui/FeedHeader";
import { RoomCard } from "../../ui/RoomCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRoomChatStore } from "../room/chat/useRoomChatStore";
import { EditScheduleRoomModalController } from "../scheduled-rooms/EditScheduleRoomModalController";
import { ScheduledRoomCard } from "../scheduled-rooms/ScheduledRoomCard";
import { CreateRoomModal } from "./CreateRoomModal";
import {MainContext} from "../../context/api_based";
import { CommunicationRoom } from "@collaborative/arthur";


interface FeedControllerProps {}

const Page = ({
  cursor,
  isLastPage,
  onLoadMore,
}: {
  cursor: number;
  isLastPage: boolean;
  isOnlyPage: boolean;
  onLoadMore: (o: number) => void;
}) => {
  const { currentRoomId } = useCurrentRoomIdStore();
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();
  const {dash_live_rooms} = useContext(MainContext);

  const rooms:CommunicationRoom[] = dash_live_rooms? dash_live_rooms:[];
  //const { isLoading, data } = useTypeSafeQuery(
   // ["getTopPublicRooms", cursor],
    //{
    //  staleTime: Infinity,
    //  enabled: !isServer,
     // refetchOnMount: "always",
      //refetchInterval: 10000,
    //},
    //[cursor]
  //);

  // useEffect(() => {
  //   if (shouldAlert && !isElectron()) {
  //     showErrorToast(
  //       t("pages.home.desktopAlert"),
  //       "sticky",
  //       <BannerButton
  //         onClick={() => {
  //           window.location.href = window.location.origin + "/download";
  //         }}
  //       >
  //         Download
  //       </BannerButton>,
  //       () => {
  //         localStorage.setItem("@baklava/showDownloadAlert", "false");
  //       }
  //     );
  //   }
  // }, []);


  if (!rooms) {
    return null;
  }
  

  // if (isOnlyPage && data.rooms.length === 0) {
  //   return (
  //     <Button variant="small" onClick={() => refetch()}>
  //       {t("pages.home.refresh")}
  //     </Button>
  //   );
  // }

  return (
    <>
      {rooms.map((room:CommunicationRoom) => (
        <RoomCard
          onClick={() => {
            //if (room.room_id !== currentRoomId) {
              //useRoomChatStore.getState().reset();
           // }

            push(`/room/[id]`, `/room/${room.room_id}`);
          }}
          key={room.room_id}
          title={room.details.name}
          subtitle={
            Array.from(Object.values(room.people_preview_data))
                  .slice(0, 3)
                  .map((x:any) => x.display_name)
                  .join(", ")
             
          }
          avatars={
             Array.from(Object.values(room.people_preview_data))
                  .map((x:any) => x.avatar_url!)
                  .slice(0, 3)
                  .filter((x) => x !== null)
             
          }
          listeners={ room.num_of_people_in_room }
          tags={[]}
        />
      ))}
    </>
  );
};

// const isMac = process.platform === "darwin";

export const FeedController: React.FC<FeedControllerProps> = ({}) => {
  const [cursors, setCursors] = useState([0]);
  //const { conn } = useContext(WebSocketContext);
  //const { t } = useTypeSafeTranslation();
  const  [roomModal, setRoomModal] = useState(false);


const userPreview: UserPreview = {
  id: "222",
  displayName: "tester",
  numFollowers: 2,
  avatarUrl: "",
};


const room:Room = {

    id: "222",
    numPeopleInside: 2,
    voiceServerId: "222",
    creatorId: "23423",
    peoplePreviewList: [userPreview],
    autoSpeaker: false,
    inserted_at: "2",
    chatMode: "default",
    name: "test room 445",
    chatThrottle: 2000,
    isPrivate: false,
    description: "test desc"

}
const user:User = {
  youAreFollowing: true,
    username: "test",
    online: true,
    numFollowing: 2,
    numFollowers: 2,
    lastOnline: "test",
    id: "223232",
    followsYou: true,
    botOwnerId: "test",
    contributions: 2,
    staff: true,
    displayName: "test",
    currentRoomId: "23323",
    currentRoom: room,
    bio: "test",
    avatarUrl: "test",
    bannerUrl: "test",
    whisperPrivacySetting: "on"


}
const  data:ScheduledRoom  = {    
  roomId: "55",
  description: "test2",
  scheduledFor: new Date().toString(),
  numAttending: 2,
  name: 'test',
  id: "321",
  creatorId: "34",
  creator: user }
//  const updater = useTypeSafeUpdateQuery();
 // const screenType = useScreenType();
  //const { currentRoomId } = useCurrentRoomIdStore();

  const currentRoomId = 20;
  const screenType = "fullscreen";
  let mb = "mb-7";
  if (screenType === "fullscreen") {
    if (currentRoomId) {
      mb = "mb-15";
    } else {
      mb = "mb-8";
    }
  }
  //  }
  //}
  // useEffect(() => {
  //   if (isElectron() && isMac) {
  //     modalAlert(t("common.requestPermissions"));
  //   }
  // }, [t]);


  return (
    <MiddlePanel
      stickyChildren={
        <FeedHeader
          actionTitle={"Create Room"}
          onActionClicked={() => {
            setRoomModal(true);
          }}
          title={"Current Rooms"}
        />
      }
    >
      <div className={`flex flex-1 flex-col ${mb}`} data-testid="feed">
        <div className="flex flex-col space-y-4">
          {
            <EditScheduleRoomModalController
              key={data.id}
              onScheduledRoom={(_, editedRoomData) => {
              }}
            >
              {({ onEdit }) => (
                <ScheduledRoomCard
                  info={data}
                  onDeleteComplete={()=>{}}
                  onEdit={() => onEdit({ cursor: "", scheduleRoomToEdit: data })}
                  noCopyLinkButton
                />
              )}
            </EditScheduleRoomModalController>
          }
          {cursors.map((cursor, i) => (
            <Page 
              key={cursor}
              cursor={cursor}
              isOnlyPage={cursors.length === 1}
              onLoadMore={(c) => setCursors([...cursors, c])}
              isLastPage={i === cursors.length - 1}
            />
          ))}
        </div>
      </div>
      {roomModal && (
        <CreateRoomModal onRequestClose={() => setRoomModal(false)} />
      )}
    </MiddlePanel>
  );
};
