'use strict';

const expect = require('chai').expect;
const Room = require('../../src/rooms').Room;
const Doors = require('../../src/doors').Doors;
const Mocks = require('../mocks/mocks.js');

const testRoom = new Room(Mocks.Room);

describe('Doors & Locks', () => {


  describe('findExit', () => {

    it('Should find an exit given a direction', () => {
      const found = Doors.findExit(testRoom, 'out');
      expect(found.length === 1).to.be.true;
    });

    it('Should not find an exit if the direction doesn\'t exist', () => {
      const found = Doors.findExit(testRoom, 'wat');
      expect(found.length === 0).to.be.true;
    });

  });

  describe('updateDestination', () => {
    const getLocation = () => '1';
    const player = { getLocation };
    const dest = {
      getExits: () => [{
        location: '1'
      }]
    };

    it('should call a callback if the exit exists', () => {
      let called = false;
      Doors.updateDestination(player, dest, () => {
        called = true;
      });

      expect(called).to.be.true;
    });

  });

  describe('Changing & checking locked state', () => {
    const fakeExit = {
      door: { locked: false }
    };

    it('should be able to lock', () => {
      Doors.lockDoor(fakeExit);
      expect(Doors.isLocked(fakeExit)).to.be.true;
    });

    it('should be able to unlock', () => {
      Doors.unlockDoor(fakeExit);
      expect(Doors.isLocked(fakeExit)).to.be.false;
    });

  });

  describe('NPC Passage', () => {
    const fakeExit = {
      door: {
        mob_locked: true,
        locked: false,
      }
    };

    it('should not allow passage if moblocked', () => {
      expect(Doors.isMobLocked(fakeExit)).to.be.true;
      expect(Doors.isNpcPassable(fakeExit)).to.be.false;
    });

    it('should not allow passage if locked', () => {
      fakeExit.door.locked = true;
      fakeExit.door.mob_locked = false;
      expect(Doors.isMobLocked(fakeExit)).to.be.false;
      expect(Doors.isNpcPassable(fakeExit)).to.be.false;
    });

    it('should allow passage if totally unlocked', () => {
      fakeExit.door.locked = false;
      expect(Doors.isNpcPassable(fakeExit)).to.be.true;
    });
  });

  describe('Is it even a door? Is it an open door?', () => {
    const fakePassage = {};
    const fakeClosedDoor = { door: { open: false } };
    const fakeOpenDoor = { door: { open: true } };

    it('Should recognize doors vs. passageways without a door', () => {
      expect(Doors.isDoor(fakePassage)).to.be.false;
      expect(Doors.isDoor(fakeClosedDoor)).to.be.true;
      expect(Doors.isDoor(fakeOpenDoor)).to.be.true;
    });

    it('Should recognize open doors -- passages without doors are always open', () => {
      expect(Doors.isOpen(fakePassage)).to.be.true;
      expect(Doors.isOpen(fakeClosedDoor)).to.be.false;
      expect(Doors.isOpen(fakeOpenDoor)).to.be.true;
    });

  });

  describe('Opening/closing & locking/unlocking', () => {
    const noop  = () => {};
    const fakeDoor    = {};
    const fakeRoom    = {};
    const fakeRooms   = {
      getAt: () => fakeRoom
    };
    const fakePlayer  = {
      emit: noop,
      getLocation: noop,
      isInCombat: () => false,
    };
    const fakePlayers = {};

    describe('Opening and closing', () => {
      const fakeDoor = {};

      it('can open doors', () => {
        Doors.openDoor('out', fakePlayer, fakePlayers, fakeRooms);
        expect(true).to.be.false;
      });
    });

    describe('Locking and unlocking', () => {

    });

  });


});
