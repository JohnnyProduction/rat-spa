import React from 'react';
import {NavigationPanel} from "../../navigation_panel";
import {TwoColumnLayout} from "../../layout/two_column_layout";
import {SectionType, SLIDES} from "./resources";
import {Carousel} from "../../carousel";
import css from './index.module.css';
import {NavHandler} from "../../nav_handler";

type Props = {
  onNext: () => void
  onPrev: () => void
  fromNextScreen: boolean
}

type State = {
  slideIndex: number,
  sectionIndex: number
}

export class HowCareScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      slideIndex: props.fromNextScreen ? SLIDES.length - 1 : 0,
      sectionIndex: props.fromNextScreen ? SLIDES[SLIDES.length - 1].sections.length - 1 : 0
    }
  }

  handleNavPanelItemClick = (slideIndex: number) => {
    this.setState({
      sectionIndex: 0,
      slideIndex: slideIndex
    })
  }

  handlePrevCarouselItem = () => {
    let nextSectionIndex = this.state.sectionIndex - 1
    let nextSlideIndex = this.state.slideIndex

    if (!SLIDES[nextSlideIndex].sections[nextSectionIndex]) {
      nextSlideIndex--

      if (!SLIDES[nextSlideIndex]) {
        this.props.onPrev()
        return
      }
      nextSectionIndex = SLIDES[nextSlideIndex].sections.length - 1
    }

    this.setState({
      sectionIndex: nextSectionIndex,
      slideIndex: nextSlideIndex
    })
  }
  handleNextCarouselItem = () => {
    let nextSectionIndex = this.state.sectionIndex + 1
    let nextSlideIndex = this.state.slideIndex

    if (!SLIDES[nextSlideIndex].sections[nextSectionIndex]) {
      nextSectionIndex = 0
      nextSlideIndex++
    }

    if (!SLIDES[nextSlideIndex]) {
      this.props.onNext()
      return
    }

    this.setState({
      sectionIndex: nextSectionIndex,
      slideIndex: nextSlideIndex
    });
  }

  render () {
    const {slideIndex, sectionIndex} = this.state

    const text = SLIDES[slideIndex].sections[sectionIndex].text;
    const subtitle = SLIDES[slideIndex].sections[sectionIndex].subtitle
    const flatSections = SLIDES.reduce<SectionType[]>(
        (result, slide) =>  result.concat(slide.sections),
      []);
    const flatSectionsIndex = SLIDES.reduce(
        (result, slide, i) => i < slideIndex ? result + slide.sections.length : result,
      0) + sectionIndex;

    return (
      <>
        <NavHandler onNext={this.handleNextCarouselItem} onPrev={this.handlePrevCarouselItem}/>
        <TwoColumnLayout
          title={'Как ухаживать'}
          key={'layout'}
          renderHeader={() => <NavigationPanel
            items={SLIDES}
            currentItemIndex={slideIndex}
            onItemClick={this.handleNavPanelItemClick}
            classname={css.nav_panel}
          />}
          renderLeft={() => (
            <Carousel
              classname={css.carousel}
              items={flatSections}
              currentItemIndex={flatSectionsIndex}
              onPrev={this.handlePrevCarouselItem}
              onNext={this.handleNextCarouselItem}
              notActiveScale={0.8}
              renderItem={(section) => (
                <img src={section.image.src} className={css.image}/>
              )}
            />
          )}
          renderRight={() => (
            <>
              <h3>{subtitle}</h3>
              <p className={css.text}>{text}</p>
            </>
          )}
        />
      </>
    )
  }
}
