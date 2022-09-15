import React, { useMemo } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import { FaIceCream, FaCompass, FaPlus } from "react-icons/fa";

const SERVER_LIST = [
  {
    id: "a9f9401f9a5c999e3fa716129f8b9398",
    image: null,
    name: "test",
  },
  {
    id: "d26b37fba19944f6a18c8b5fbc833a87",
    image: "https://cdn.discordapp.com/embed/avatars/0.png",
    name: "My Server 2",
  },
  {
    id: "ed0416b3ff30643dd593cb6a1d204349",
    image: null,
    name: "My Server 3",
  },
  {
    id: "1f45ca7976b1af9481cd516c17e3dfff",
    image: "https://cdn.discordapp.com/icons/531166470579814420/a_04e82454e8b3db04b42ad09d6a161ca3.webp?size=96",
    name: "Formula 1",
  },
];

const ServerListSideBar: React.FC<{ activeConversationId: string }> = ({ activeConversationId }) => {
  const router = useRouter();

  const serverList = useMemo(() => {
    let list: {
      id: string;
      name: string;
      image: string | null;
      type: string;
      onClick: any;
      iconComponent: React.ReactNode;
    }[] = [
      {
        id: "@me",
        name: "app-navigation",
        image: null,
        type: "app-navigation",
        onClick: () => router.push("/channels/@me"),
        iconComponent: <FaIceCream size="28" />,
      },
      {
        id: "divider-1",
        name: "divider",
        image: null,
        type: "divider",
        iconComponent: <SideBarDivider />,
        onClick: async () => false,
      },
    ];
    const mappedServers = SERVER_LIST.map((server) => ({
      id: server.id,
      name: server.name,
      image: server.image,
      type: "app-navigation",
      onClick: () => router.push("/channels/" + server.id),
      iconComponent: (
        <ServerIcon image={server.image} name={server.name} isActive={activeConversationId === server.id} />
      ),
    }));
    list = [...list, ...mappedServers];
    list.push({
      id: "divider-2",
      name: "divider",
      image: null,
      type: "divider",
      iconComponent: <SideBarDivider />,
      onClick: async () => false,
    });
    list.push({
      id: "add-server",
      name: "Add server",
      image: null,
      type: "app-interaction",
      onClick: () => alert("Add a server"),
      iconComponent: <FaPlus size="22" />,
    });
    list.push({
      id: "find-servers",
      name: "Discover",
      image: null,
      type: "app-interaction",
      onClick: () => alert("Find server"),
      iconComponent: <FaCompass size="22" />,
    });
    return list;
  }, [activeConversationId, router]);

  return (
    <nav className="flex-0 overflow-y-scroll h-screen bg-discordgray-900 shadow-lg pt-1">
      <div className="w-20 flex flex-col">
        {serverList.map((option) => (
          <React.Fragment key={`server-list-${option.id}`}>
            {(option.type === "app-navigation" || option.type === "app-interaction") && (
              <SideBarIcon
                isActive={activeConversationId === option.id}
                onClick={option.onClick}
                icon={option.iconComponent}
              />
            )}
            {option.type === "divider" && <>{option.iconComponent}</>}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

const SideBarIcon: React.FC<
  { icon: React.ReactNode; isActive?: boolean } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ icon, isActive = false, ...rest }) => {
  const className = cn(
    "relative",
    "flex",
    "items-center",
    "justify-center",
    "h-12",
    "w-12",
    "mt-2",
    "mb-2",
    "mx-auto",
    {
      "rounded-3xl": isActive === false,
      "bg-discordgray-800": isActive === false,
      "hover:bg-indigo-500": isActive === false,
      "text-discordgray-50": isActive === false,
      "hover:text-white": isActive === false,
      "hover:rounded-xl": isActive === false,
    },
    {
      "bg-indigo-500": isActive,
      "text-white": isActive,
      "rounded-xl": isActive,
    },
    "transition-all",
    "duration-300",
    "ease-linear",
    "cursor-pointer",
    "shadow-lg",
    "group"
  );

  const indicatorClassName = cn(
    "absolute",
    "w-2",
    "-left-5",
    "rounded-r-sm",
    "origin-left",
    "transition-all",
    "duration-200",
    "bg-white",
    {
      "h-4": isActive === false,
      "top-4": isActive === false,
      "scale-0": isActive === false,
      "group-hover:scale-100": isActive === false,
    },
    { "h-8": isActive, "top-2": isActive, "scale-100": isActive }
  );
  return (
    <button {...rest} type="button" className={className}>
      <span className={indicatorClassName}></span>
      {icon}
    </button>
  );
};

const SideBarDivider = () => {
  return <hr className="bg-discordgray-800 border border-discordgray-800 rounded-full mx-6" />;
};

function getListServerName(name: string) {
  const splitName = name.split(" ");

  if (splitName[0] && splitName.length === 1 && splitName[0].length > 2) {
    const firstLetter = splitName[0]?.charAt(0);
    const secondLetter = splitName[0]?.charAt(1);
    return `${firstLetter}${secondLetter}`.toUpperCase();
  }

  const firstWord = splitName[0];
  const secondWord = splitName[1];
  if (splitName.length >= 2 && firstWord && secondWord) {
    return `${firstWord.charAt(0)}${secondWord.charAt(0)}`.toUpperCase();
  }

  return "NA";
}

const ServerIcon: React.FC<{ image: string | null; name: string; isActive?: boolean }> = ({
  image,
  name,
  isActive = false,
}) => {
  const className = cn(
    "transition-all",
    "duration-300",
    "ease-linear",
    "overflow-hidden",
    "w-12",
    {
      "rounded-3xl": isActive === false,
      "hover:rounded-xl": isActive === false,
    },
    {
      "rounded-xl": isActive,
    }
  );
  return (
    <div className={className}>
      {image ? (
        <img className="object-cover" width={50} height={50} src={image} alt={name} />
      ) : (
        <span>{getListServerName(name)}</span>
      )}
    </div>
  );
};

export default ServerListSideBar;
