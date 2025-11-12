export default function Categories({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      className={className}
    >
      <path
        d="M10.2794 0.75C14.2725 0.75 16.269 0.75 17.5095 1.92157C18.75 3.09315 18.75 4.97876 18.75 8.75V12.75C18.75 16.5212 18.75 18.4069 17.5095 19.5784C16.269 20.75 14.2725 20.75 10.2794 20.75H9.22059C5.22751 20.75 3.23098 20.75 1.99049 19.5784C0.75 18.4069 0.75 16.5212 0.75 12.75L0.75 8.75C0.75 4.97876 0.750001 3.09315 1.99049 1.92157C3.23098 0.75 5.22752 0.75 9.22059 0.75L10.2794 0.75Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M5.75 5.75H13.75"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M5.75 10.75H13.75"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M5.75 15.75L9.75 15.75"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
}
