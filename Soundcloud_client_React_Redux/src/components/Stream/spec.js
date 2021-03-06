/*eslint-disable no-undef*/
import {shallow} from 'enzyme'
import Stream from './presenter'

describe('Stream', () => {

  const props = {
    tracks: [{title: 'x'}, {title: 'y'}],
  }

  it('shows two elements', () => {
    const element = shallow(<Stream { ...props } />)

    expect(element.find('.track')).to.have.length(2)
  })
})
