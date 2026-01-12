import Icon from "@mdi/react";
import {
  mdiPlus,
  mdiClose,
  mdiPackageVariant,
  mdiCheckCircle,
  mdiAlert,
  mdiInformation,
  mdiAlertCircle,
  mdiLightningBolt,
  mdiArrowUp,
  mdiArrowDown,
  mdiFolder,
  mdiVideo,
  mdiMusic,
  mdiViewGrid,
  mdiFile,
  mdiDownload,
  mdiArrowRight,
  mdiAccountGroup,
  mdiTrashCan,
  mdiChevronUp,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiPencil,
  mdiEmail,
  mdiLock,
  mdiAccount,
  mdiCalendar,
  mdiEye,
  mdiEyeOff,
  mdiClock,
  mdiContentCopy,
  mdiChat,
  mdiDotsHorizontal,
} from "@mdi/js";

const createIcon = (path) => (props) => <Icon path={path} {...props} />;

export const PlusIcon = createIcon(mdiPlus);
export const CloseIcon = createIcon(mdiClose);
export const BoxIcon = createIcon(mdiPackageVariant);
export const CheckCircleIcon = createIcon(mdiCheckCircle);
export const AlertIcon = createIcon(mdiAlert);
export const InfoIcon = createIcon(mdiInformation);
export const ErrorIcon = createIcon(mdiAlertCircle);
export const BoltIcon = createIcon(mdiLightningBolt);
export const ArrowUpIcon = createIcon(mdiArrowUp);
export const ArrowDownIcon = createIcon(mdiArrowDown);
export const FolderIcon = createIcon(mdiFolder);
export const VideoIcon = createIcon(mdiVideo);
export const AudioIcon = createIcon(mdiMusic);
export const GridIcon = createIcon(mdiViewGrid);
export const FileIcon = createIcon(mdiFile);
export const DownloadIcon = createIcon(mdiDownload);
export const ArrowRightIcon = createIcon(mdiArrowRight);
export const GroupIcon = createIcon(mdiAccountGroup);
export const TrashBinIcon = createIcon(mdiTrashCan);
export const ChevronUpIcon = createIcon(mdiChevronUp);
export const ChevronDownIcon = createIcon(mdiChevronDown);
export const ChevronLeftIcon = createIcon(mdiChevronLeft);
export const ChevronRightIcon = createIcon(mdiChevronRight);
export const PencilIcon = createIcon(mdiPencil);
export const EnvelopeIcon = createIcon(mdiEmail);
export const LockIcon = createIcon(mdiLock);
export const UserIcon = createIcon(mdiAccount);
export const CalenderIcon = createIcon(mdiCalendar);
export const EyeIcon = createIcon(mdiEye);
export const EyeCloseIcon = createIcon(mdiEyeOff);
export const TimeIcon = createIcon(mdiClock);
export const CopyIcon = createIcon(mdiContentCopy);
export const ChatIcon = createIcon(mdiChat);
export const MoreDotIcon = createIcon(mdiDotsHorizontal);
