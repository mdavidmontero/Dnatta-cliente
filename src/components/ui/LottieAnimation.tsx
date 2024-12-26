import Lottie from "react-lottie";

interface Props {
  animationData: unknown;
  width?: number;
  height?: number;
}
export default function LottieAnimation({
  animationData,
  width = 400,
  height = 400,
}: Props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData as unknown,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex items-center justify-center ">
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
}
