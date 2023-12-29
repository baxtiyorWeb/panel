import ContentLoader from "react-content-loader";

// eslint-disable-next-line react/prop-types
export const Loading = ({ loading }) => {
  return (
    <div className={"flex justify-center items-center"}>
      <ContentLoader
        width={1300}
        height={400}
        viewBox="0 0 1200 400"
        backgroundColor="#3B4452"
        foregroundColor="#343C48"
        {...loading}
      >
        <circle cx="50" cy="75" r="30" width="300" />
        <rect x="100" y="45" rx="10" ry="0" width="1300" height="50" />
        <circle cx="50" cy="175" r="30" width="300" />
        <rect x="100" y="150" rx="10" ry="0" width="1300" height="50" />
        <circle cx="50" cy="275" r="30" width="300" />
        <rect x="100" y="245" rx="10" ry="0" width="1300" height="50" />
        <circle cx="50" cy="365" r="30" width="300" />
        <rect x="100" y="340" rx="10" ry="0" width="1300" height="50" />
        <rect x="100" y="450" rx="10" ry="0" width="1300" height="50" />
        {/* 
        <rect x="26" y="258" rx="10" ry="10" width="150" height="20" />
        <rect x="66" y="258" rx="10" ry="10" width="150" height="20" />
        <rect x="187" y="258" rx="10" ry="10" width="300" height="20" />
        <rect x="401" y="258" rx="10" ry="10" width="150" height="20" />
        <rect x="522" y="258" rx="10" ry="10" width="300" height="20" />
        <rect x="730" y="258" rx="10" ry="10" width="150" height="20" />
        <rect x="900" y="258" rx="10" ry="10" width="150" height="20" /> */}
        {/* 
        <rect x="26" y="318" rx="10" ry="4" width="20" height="20" />
        <rect x="66" y="318" rx="10" ry="10" width="150" height="20" />
        <rect x="187" y="318" rx="10" ry="10" width="300" height="20" />
        <rect x="401" y="318" rx="10" ry="10" width="150" height="20" />
        <rect x="522" y="318" rx="10" ry="10" width="300" height="20" />
        <rect x="730" y="318" rx="10" ry="10" width="150" height="20" />
        <rect x="900" y="318" rx="10" ry="10" width="150" height="20" /> */}

        {/* <circle cx="37" cy="97" r="11" />
        <rect x="26" y="23" rx="5" ry="5" width="153" height="30" />
        <circle cx="77" cy="96" r="11" /> */}
      </ContentLoader>



    </div>
  );
};
