import React from 'react'
import { App } from '../../../components/app'
import { getStaticPropsByIndex, StaticProps, DATA_TREE } from '../../../model/screen'

export const getStaticProps = getStaticPropsByIndex(DATA_TREE.how_care.care.permitted_feed.index)

export default (props: StaticProps) => (
  <App initialStoreProps={props.initialStoreProps} />
)