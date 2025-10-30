import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  SHARE_ADDRESS,
  SHARE_ADDRESS_TITLE,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

export const ShareButton = () => {
  const kakao = useKakao()

  const handleShare = () => {
    if (!kakao) return

    kakao.Share.sendDefault({
      objectType: "location",
      address: SHARE_ADDRESS,
      addressTitle: SHARE_ADDRESS_TITLE,
      content: {
        title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
        description: WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
        imageUrl: "https://ohmypsc.github.io/260711-main/preview_image.png",
        link: {
          mobileWebUrl: "https://ohmypsc.github.io/260711-main",
          webUrl: "https://ohmypsc.github.io/260711-main",
        },
      },
      buttons: [
        {
          title: "초대장 보기",
          link: {
            mobileWebUrl: "https://ohmypsc.github.io/260711-main",
            webUrl: "https://ohmypsc.github.io/260711-main",
          },
        },
      ],
    })
  }

  return (
    <LazyDiv className="footer share-button">
      <button className="ktalk-share" onClick={handleShare}>
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
